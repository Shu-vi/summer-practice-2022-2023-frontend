import React, {useEffect, useState} from 'react';
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {Map, Placemark} from "@pbe/react-yandex-maps";
import {getAllUsers} from "../api/UserApi";
import {useErrorHandler} from "../hooks/useErrorHandler";
import {geocodeLocation} from "../api/openstreet-api/CoordinatesApi";
import {useSelector} from "react-redux";
import UserItem from "../components/UserItem";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const errorHandler = useErrorHandler();
    const [usersWithCoords, setUsersWithCoords] = useState([]);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const fetchUsers = async () => {
            const temp = await getAllUsers();
            if (temp) {
                setUsers(temp);
            } else {
                setError('Не найден ни 1 пользователь');
            }
        }

        fetchUsers();
    }, [user])

    useEffect(() => {
        const fetchUserCoords = async () => {
            const usersWithCoordsData = [];
            for (let user of users) {
                try {
                    const data = await geocodeLocation(`${user.city} ${user.district}`);
                    const userWithCoords = {...user, lat: data[0].lat, lon: data[0].lon};
                    usersWithCoordsData.push(userWithCoords);
                } catch (error) {
                    errorHandler(error);
                }
            }
            setUsersWithCoords(usersWithCoordsData);
        };

        if (users.length > 0) {
            fetchUserCoords();
        }
    }, [users]);

    return (
        <Container className="mt-5" style={{height: '70vh'}}>
            <Row style={{overflowY: 'scroll'}} className='h-100 mb-5'>
                <Col>
                    <ListGroup>
                        {
                            users.map((user) => (
                                (<ListGroup.Item key={user.username}>
                                    <UserItem user={user}/>
                                </ListGroup.Item>)))
                        }
                        {
                            error !== '' && (
                                error
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>

            {error}
            <Map
                defaultState={{
                    center: [55.75, 37.57],
                    zoom: 9,
                    controls: ["zoomControl", "fullscreenControl"],
                }}
                modules={["control.ZoomControl", "control.FullscreenControl"]}
                style={{width: '100%', height: '60vh'}}
            >
                {usersWithCoords.map(user => (
                    <Placemark
                        key={user.username}
                        modules={["geoObject.addon.balloon"]}
                        geometry={[user.lat, user.lon]}
                        properties={{
                            balloonContentHeader: `${user.firstName} ${user.lastName}`,
                            balloonContentBody: `${user.city}, ${user.district}`,
                        }}
                    />
                ))}
            </Map>
        </Container>
    );
};

export default Admin;
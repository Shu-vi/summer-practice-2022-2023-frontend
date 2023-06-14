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
        <Container className="mt-5 d-flex bg-dark align-items-center" style={{height: '70vh', borderRadius: 20, maxWidth: "85%"}}>
            <Col>
                <h1 className="text-center text-white mb-5">Список пользователей</h1>
                <Row style={{overflowY: 'scroll', border: "1px solid white", borderRadius: 10, backgroundColor: '#ffffe0'}} className='h-90 mb-5 w-100 mr-5 pt-3 ml-2'>
                    <Col>
                        <ListGroup>
                            {
                                users.map((user) => (
                                    (<ListGroup.Item key={user.username} className="mb-2 bg-dark text-white" style={{boxShadow: '3px 3px 3px gray', borderRadius:10}}>
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
            </Col>
            <Map
                defaultState={{
                    center: [55.75, 37.57],
                    zoom: 9,
                    controls: ["zoomControl", "fullscreenControl"],
                }}
                modules={["control.ZoomControl", "control.FullscreenControl"]}
                style={{height: '60vh'}}
                className="w-50"
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
import React, {useEffect, useState} from 'react';
import {useErrorHandler} from "../hooks/useErrorHandler";
import {Modal} from "react-bootstrap";
import {Map, Placemark} from "@pbe/react-yandex-maps";
import {geocodeLocation} from "../api/openstreet-api/CoordinatesApi";

const ModalYandexMap = ({show, setShow, users, setUsers, ...props}) => {
    const errorHandler = useErrorHandler();
    const [usersWithCoords, setUsersWithCoords] = useState([]);

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

        fetchUserCoords();
    }, [users]);

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Расположение участников игры</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Map
                        defaultState={{
                            center: [55.75, 37.57],
                            zoom: 9,
                            controls: ["zoomControl", "fullscreenControl"],
                        }}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}
                        style={{width: '100%', height: '40vh'}}
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
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalYandexMap;

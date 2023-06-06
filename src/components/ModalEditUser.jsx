import React, {useState} from 'react';
import {useErrorHandler} from "../hooks/useErrorHandler";
import {Button, Form, Modal} from "react-bootstrap";
import {updateUser} from "../api/UserApi";

const ModalEditUser = ({user, show, setShow, ...props}) => {
    const [city, setCity] = useState(user.city);
    const [district, setDistrict] = useState(user.district);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const errorHandler = useErrorHandler();

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            user.city = city;
            user.district = district;
            user.firstName = firstName;
            user.lastName = lastName;
            await updateUser(user);
        } catch (e) {
            errorHandler(e);
        }
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Редактировать пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="cityName">
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите город"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="distrcitName">
                            <Form.Label>Район</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Название района"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Фамилия"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalEditUser;
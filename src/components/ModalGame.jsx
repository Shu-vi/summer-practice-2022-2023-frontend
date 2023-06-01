import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {createGame} from "../api/GameApi";

const ModalGame = ({show, setShow, ...props}) => {
    const [title, setTitle] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(2);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        try {
            if (token) {
                const data = jwtDecode(token);
                await createGame({maxPlayers, owner: data.username, title});
                //TODO отобразить в UI новую игру
            } else {
                alert('Срок жизни сессии истёк. Авторизуйтесь снова');
                navigate(LOGIN_ROUTE);
            }
        } catch (e) {
            alert('Срок жизни сессии истёк. Авторизуйтесь снова');
            navigate(LOGIN_ROUTE);
        }
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Создание игры</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="roomName">
                            <Form.Label>Название игры</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="maxPlayers">
                            <Form.Label>Максимальное число игроков в комнате</Form.Label>
                            <Form.Control
                                type="number"
                                min="2"
                                max="10"
                                placeholder="Введите число"
                                value={maxPlayers}
                                onChange={(e) => setMaxPlayers(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Создать
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalGame;

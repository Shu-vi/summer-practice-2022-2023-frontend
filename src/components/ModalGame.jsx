import React, {useState} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {createGame} from "../api/GameApi";
import {getUsername} from "../utils/storage";
import {useErrorHandler} from "../hooks/useErrorHandler";

const ModalGame = ({show, setShow, setGames, setError, ...props}) => {
    const [title, setTitle] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(2);
    const errorHandler = useErrorHandler();

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = getUsername();
        try {
            const game = await createGame({maxPlayers, owner: username, title});
            setGames(prev => [...prev, game]);
            setError('');
        } catch (e) {
            errorHandler(e);
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

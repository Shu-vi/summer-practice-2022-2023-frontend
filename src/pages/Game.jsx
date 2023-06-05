import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, InputGroup, FormControl, Container} from 'react-bootstrap';
import MessageItem from "../components/MessageItem";
import {useNavigate, useParams} from "react-router-dom";
import {createPhrase, fetchPhrasesByGameId} from "../api/PhraseApi";
import {disconnectFromGame} from "../api/GameApi";
import {GAMES_ROUTE} from "../utils/consts";
import {useErrorHandler} from "../hooks/useErrorHandler";
import {useSelector} from "react-redux";
import ModalYandexMap from "../components/ModalYandexMap";
import {getUsersByGameId} from "../api/UserApi";

function Game() {
    const {id} = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const errorHandler = useErrorHandler();
    const user = useSelector(state => state.auth.user);
    const socket = useRef(null);

    useEffect(() => {
        fetchPhrasesByGameId(id)
            .then(data => setMessages(data || []))
            .catch(e => errorHandler(e));
    }, []);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5002/');
        socket.current = ws;
        getUsersByGameId(id)
            .then(data => setUsers(data || []))
            .catch(e => errorHandler(e));
        return () => {
            ws.close();
        };
    }, [])

    useEffect(() => {
        if (user) {
            socket.current.onopen = () => {
                console.log('Сокет открыт')
                socket.current.send(JSON.stringify({
                    id,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    method: "connection"
                }));
            }
            socket.current.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.lastName} присоединился`);
                        break;
                    case "chat":
                        setMessages(prevMessages => [...prevMessages, msg.msg]);
                        break;
                    default:
                        break;
                }
            }
        }

    }, [user])

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleLeave = () => {
        disconnectFromGame(user.username, id)
            .then(() => navigate(GAMES_ROUTE))
            .catch(e => errorHandler(e));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPhrase({gameId: id, username: user.username, text})
            .then(phrase => {
                socket.current.send(JSON.stringify({msg: {user, phrase}, method: 'chat', id}));
            })
            .catch(e => console.error(e))
        setText('');
    };

    const handleShowMap = () => {
        getUsersByGameId(id)
            .then(data => {
                setUsers(data);
                setShow(true);
            })
            .catch(e => errorHandler(e));
    }

    return (
        <>
            <Container className="mt-4">
                <Button variant="danger" onClick={handleLeave}>
                    Покинуть игру
                </Button>
                <Button variant='info' onClick={handleShowMap}>
                    Карта
                </Button>
                <div className="mt-3" style={{height: '70vh', overflowY: 'scroll', border: 'solid 1px black'}}>
                    {messages.map((message) => (
                        <MessageItem message={message} key={message.phrase.timestamp}/>
                    ))}
                </div>
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mt-3">
                        <FormControl
                            placeholder="Введите сообщение"
                            value={text}
                            onChange={handleTextChange}
                        />
                        <Button variant="primary" type="submit">
                            Отправить
                        </Button>
                    </InputGroup>
                </Form>
            </Container>
            <ModalYandexMap setShow={setShow} show={show} users={users} setUsers={setUsers}/>
        </>

    );
}

export default Game;
import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, InputGroup, FormControl, Container, Row, Col} from 'react-bootstrap';
import MessageItem from "../components/MessageItem";
import {useNavigate, useParams} from "react-router-dom";
import {createPhrase, fetchPhrasesByGameId} from "../api/PhraseApi";
import {disconnectFromGame, fetchGameById} from "../api/GameApi";
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
        fetchGameById(id)
            .then(game => {
                if (!game) {
                    alert('Игра была удалена или ещё не создана');
                    navigate(GAMES_ROUTE);
                }
            })
            .catch(e => errorHandler(e));
    }, [])

    useEffect(() => {
        fetchPhrasesByGameId(id)
            .then(data => setMessages(data || []))
            .catch(e => errorHandler(e));
    }, []);

    useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_SOCKET_API_URL);
        socket.current = ws;
        getUsersByGameId(id)
            .then(data => setUsers(data || []))
            .catch(e => errorHandler(e));
        return () => {
            ws.close();
        };
    }, [user])

    useEffect(() => {
        if (user) {
            socket.current.onopen = () => {
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
            <Container className="bg-dark text-white mt-4" style={{height: '80vh', borderRadius: 20, width: '95%', marginLeft: "20%"}}>
                   {/* <Button variant="danger" onClick={handleLeave}>
                        Покинуть игру
                    </Button>
                    <Button variant='info' onClick={handleShowMap}>
                        Карта
                    </Button>*/}
                <Row style={{display:"flex"}}>
                    <Col className="col-8">
                    <div className="mt-3"  style={{height: 600, overflowY: 'scroll', borderRadius: 20, backgroundColor: '#ffffe0', border: 'solid 2px green'}}>
                        {messages.map((message) => (
                            <MessageItem  message={message} key={message.phrase.timestamp}/>
                        ))}
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mt-4">

                                <FormControl
                                    className=" form-control bg-dark text-white"
                                    placeholder="Введите сообщение"
                                    value={text}
                                    onChange={handleTextChange}
                                />
                                <Button variant="success" type="submit" className="ml-3">
                                    Отправить
                                </Button>

                        </InputGroup>
                    </Form>
                    </Col>
                    <Col>
                        <Row className="justify-content-center" style ={{marginTop: "70%"}}>
                            <Button variant='info' onClick={handleShowMap}>
                                Карта
                            </Button>
                        </Row>
                        <Row className="justify-content-center mt-5">
                            <Button variant="danger" onClick={handleLeave}>
                                Покинуть игру
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <ModalYandexMap setShow={setShow} show={show} users={users} setUsers={setUsers}/>
        </>

    );
}

export default Game;
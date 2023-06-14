import React, {useEffect, useState} from 'react';
import {Container, Row, Col, InputGroup, FormControl, Button, ListGroup} from 'react-bootstrap';
import GameItem from "../components/GameItem";
import {fetchAll, searchGames} from "../api/GameApi";
import ModalCreateGame from "../components/ModalCreateGame";
import {useSelector} from "react-redux";
import {useErrorHandler} from "../hooks/useErrorHandler";

function Games() {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const user = useSelector(state => state.auth.user);
    const errorHandler = useErrorHandler();

    useEffect(() => {
        fetchAll()
            .then(data => {
                setGames(data);
            })
            .catch(e => {
                if (e.response.data) {
                    setError(e.response.data.message);
                } else {
                    setError(e.message);
                }
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCreate = () => {
        setShow(true);
    };

    const refreshHandler = () => {
        fetchAll()
            .then(data => {
                setGames(data);
            })
            .catch(e => {
                if (e.response.data.message) {
                    setGames([]);
                    setError(e.response.data.message);
                } else {
                    setError(e.message);
                }
            });
    };

    const searchHandler = () => {
        searchGames(search)
            .then(data => setGames(data))
            .catch(e => {
                errorHandler(e);
                if (e.response) {
                    setError(e.response.data.message);
                }
                setGames([]);
            });
    }

    return (
        <>
            <Row style={{display:"flex"}}>
                <Col>
                    <Container className="bg-dark text-white mt-4" style={{height: '90vh', borderRadius: 20, width: '95%', marginLeft: 30}}>
                        <Row className="pt-3">
                            <Col className="col-10 mx-4">
                                <InputGroup className="mt-3">
                                    <FormControl
                                        className=" form-control bg-dark text-white"
                                        placeholder="Введите название игры или имя пользователя автора"
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-end px-3">
                                    <Button variant='outline-info' className='my-3' onClick={searchHandler}>
                                        Поиск
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className='m-4 pt-3' style={{height: '70%', overflowY: 'scroll', borderRadius: 20, backgroundColor: '#ffffe0'}}>
                            <Col>
                                <ListGroup >
                                    {
                                        games.map((game) => (
                                            (<ListGroup.Item key={game.id} style = {{borderRadius: 10, marginBottom:10, boxShadow: '3px 3px 3px gray'}} className={"bg-dark"}>
                                                <GameItem game={game}/>
                                            </ListGroup.Item>)))
                                    }
                                    <div className="text-dark">{
                                        error !== '' && (
                                            error
                                        )
                                    } </div>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end px-5">
                                <Button variant="success" onClick={handleCreate} disabled={user === null} style={{marginRight: 15}}>
                                    Создать свою игру
                                </Button>
                                <Button variant="outline-warning" onClick={refreshHandler}>
                                    Обновить
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <ModalCreateGame show={show} setShow={setShow} setGames={setGames} setError={setError}/>
                </Col>
                <Col>
                    <Container className="bg-dark text-white mt-4" style={{height: '90vh', borderRadius: 20, width: '95%'}}>
                        <h1 className="px-2 mb-4" style={{fontFamily: "monospace", color: "white", fontSize: 35, fontWeight: "normal", paddingTop: 25}}>
                            Здесь ты можешь найти игру и присоединиться к ней.
                        </h1>
                        <ul className="list-unstyled">
                        <h1 className="px-2" style={{fontFamily: "monospace", color: "white", fontSize: 30, fontWeight: "normal"}}>
                            Воспользуйся удобным поиском. Ты можешь ввести:</h1>
                            <ul className="px-5" style={{fontFamily: "monospace", color: "white", fontSize: 20, fontWeight: "normal"}}>
                            <li className="mt-3">Имя автора лобби</li>
                            <li className="mt-3">Название игровой комнаты</li>
                            </ul>
                        </ul>
                        <h1 className="px-2 mb-4" style={{fontFamily: "monospace", color: "white", fontSize: 30, fontWeight: "normal", paddingTop: 25}}>
                            Создай свою игру, указав количество игроков и наименование <p className="mt-3 text-center" style={{color: "yellow",fontSize: 15, fontStyle: "italic"}}>Авторизуйся если функция не доступна</p>
                        </h1>
                        <p className="px-2" style={{fontFamily: "monospace", color: "white", fontSize: 30, fontWeight: "normal", paddingTop: 25}}>В игре есть чат для взаимодействия с другими игроками.
                            Сообщения отображаются моментально.
                        </p>
                        <p className="px-2" style={{fontFamily: "monospace", color: "white", fontSize: 30, fontWeight: "normal"}}>Но если долго молчать или не соврешать какие либо действия -
                            <span style={{color: "red", fontFamily: 'Horror'}}> игра будет удалена</span>.
                        </p>

                    </Container>
                </Col>
            </Row>
        </>
    );
}

export default Games;
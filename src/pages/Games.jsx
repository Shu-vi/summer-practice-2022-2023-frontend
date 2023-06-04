import React, {useEffect, useState} from 'react';
import {Container, Row, Col, InputGroup, FormControl, Button, ListGroup} from 'react-bootstrap';
import GameItem from "../components/GameItem";
import {fetchAll} from "../api/GameApi";
import ModalGame from "../components/ModalGame";

function Games() {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchAll()
            .then(data => {
                setGames(data);
            })
            .catch(e => {
                if (e.response.data.message) {
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
                    setError(e.response.data.message);
                } else {
                    setError(e.message);
                }
            });
    }

    return (
        <>
            <Container className="mt-5" style={{height: '70vh'}}>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Поиск</InputGroup.Text>
                            <FormControl
                                placeholder="Введите название игры"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row style={{height: '100%', overflowY: 'scroll'}}>
                    <Col>
                        <ListGroup>
                            {
                                games.map((game) => (
                                    (<ListGroup.Item key={game.id}>
                                        <GameItem game={game}/>
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
                <Row className="mt-3">
                    <Col className="d-flex justify-content-end">
                        <Button variant="success" onClick={handleCreate}>
                            Создать свою игру
                        </Button>
                        <Button onClick={refreshHandler}>
                            Обновить
                        </Button>
                    </Col>
                </Row>
            </Container>
            <ModalGame show={show} setShow={setShow} setGames={setGames}/>
        </>

    );
}

export default Games;
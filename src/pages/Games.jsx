import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import GameItem from "../components/GameItem";

function Games(props) {
    // Получаем список игр из props
    const games = [
        {
            id: 1,
            name: 'Морской бой',
            creator: 'Alex',
            players: 2,
        },
        {
            id: 2,
            name: 'Шахматы',
            creator: 'Bob',
            players: 1,
        },
        {
            id: 3,
            name: 'Крестики-нолики',
            creator: 'Charlie',
            players: 2,
        },
        {
            id: 4,
            name: 'Судоку',
            creator: 'Diana',
            players: 1,
        },
        {
            id: 3,
            name: 'Крестики-нолики',
            creator: 'Charlie',
            players: 2,
        },
        {
            id: 4,
            name: 'Судоку',
            creator: 'Diana',
            players: 1,
        },
        {
            id: 3,
            name: 'Крестики-нолики',
            creator: 'Charlie',
            players: 2,
        },
        {
            id: 4,
            name: 'Судоку',
            creator: 'Diana',
            players: 1,
        },
    ];


    // Создаем локальный стейт для поискового запроса
    const [search, setSearch] = useState('');

    // Функция для обработки изменения поискового поля
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Функция для фильтрации игр по названию
    const filterGames = (games) => {
        return games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
    };


    // Функция для обработки нажатия на кнопку "Создать свою игру"
    const handleCreate = () => {
        // Здесь можно добавить логику для создания новой игры
        console.log('Вы создали новую игру');
    };

    return (
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
            <Row style={{ height: '100%', overflowY: 'scroll' }}>
                <Col>
                    <ListGroup>
                        {filterGames(games).map((game) => (
                            <ListGroup.Item key={game.id}>
                                <GameItem game={game}/>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="d-flex justify-content-end">
                    <Button variant="success" onClick={handleCreate}>
                        Создать свою игру
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Games;
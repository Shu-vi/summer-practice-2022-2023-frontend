import React from 'react';
import {Button} from "react-bootstrap";

const GameItem = ({game, ...props}) => {
    // Функция для обработки нажатия на кнопку "Подключиться"
    const handleJoin = (gameId) => {
        // Здесь можно добавить логику для подключения к игре
        console.log('Вы подключились к игре с id', gameId);
    };
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h5>{game.name}</h5>
                <p>Создатель: {game.creator}</p>
            </div>
            <div className="d-flex align-items-center">
                <p className="mr-3">Игроков: {game.players}/5</p>
                <Button variant="primary" onClick={() => handleJoin(game.id)}>
                    Подключиться
                </Button>
            </div>
        </div>
    );
};

export default GameItem;
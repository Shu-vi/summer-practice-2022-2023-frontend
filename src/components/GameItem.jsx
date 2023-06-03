import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {connectToGame, countingConnectionByGameId} from "../api/GameApi";
import {useEffect} from "react";
import {GAME_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {getUsername} from "../utils/storage";
import {useErrorHandler} from "../hooks/useErrorHandler";

const GameItem = ({game, ...props}) => {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const errorHandler = useErrorHandler();
    const navigate = useNavigate();

    useEffect(() => {
        countingConnectionByGameId(game.id)
            .then(count => setCurrentPlayer(count))
            .catch(e => errorHandler(e));
    }, []);

    const handleJoin = async () => {
        let username = getUsername();
        try {
            await connectToGame(username, game.id);
            navigate(GAME_ROUTE + `/${game.id}`);
        } catch (e) {
            errorHandler(e);
        }
    };
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h5>{game.title}</h5>
                <p>Создатель: {game.owner}</p>
            </div>
            <div className="d-flex align-items-center">
                <p className="mr-3">Игроков: {currentPlayer}/{game.maxPlayers}</p>
                <Button variant="primary" onClick={() => handleJoin()}>
                    Подключиться
                </Button>
            </div>
        </div>
    );
};

export default GameItem;
import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {connectToGame, countingConnectionByGameId} from "../api/GameApi";
import {useEffect} from "react";
import {GAME_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {getUsername} from "../utils/storage";
import {useErrorHandler} from "../hooks/useErrorHandler";
import {useSelector} from "react-redux";

const GameItem = ({game, ...props}) => {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const errorHandler = useErrorHandler();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        countingConnectionByGameId(game.id)
            .then(count => setCurrentPlayer(count))
            .catch(e => errorHandler(e));
    }, [game]);

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
        <div className="text-white d-flex justify-content-between align-items-center">
            <div>
                <h5>{game.title}</h5>
                <p>Создатель: {game.owner}</p>
            </div>
            <div className="d-flex align-items-center" >
                <p className="mr-3 pt-3">Игроки: {currentPlayer}/{game.maxPlayers}</p>
                <Button variant="outline-info" onClick={handleJoin} disabled={user === null}>
                    Подключиться
                </Button>
            </div>
        </div>
    );
};

export default GameItem;
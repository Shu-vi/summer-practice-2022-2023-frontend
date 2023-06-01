import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {connectToGame, countingConnectionByGameId} from "../api/GameApi";
import {useEffect} from "react";
import jwtDecode from "jwt-decode";
import {GAME_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const GameItem = ({game, ...props}) => {
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        countingConnectionByGameId(game.id)
            .then(count => {
                setCurrentPlayer(count);
            })
    }, []);

    const handleJoin = async () => {
        let token = localStorage.getItem('token');
        let username = null;
        try {
            if (token) {
                const data = jwtDecode(token);
                username = data.username;
            } else {
                alert('Срок жизни сессии истёк. Авторизуйтесь снова');
                navigate(LOGIN_ROUTE);
                return;
            }
        } catch (e) {
            alert('Срок жизни сессии истёк. Авторизуйтесь снова');
            navigate(LOGIN_ROUTE);
            return;
        }

        try {
            await connectToGame(username, game.id);
            navigate(GAME_ROUTE + `/${game.id}`);
        } catch (e) {
            if (e.response.data.message) {
                alert(e.response.data.message);
            } else {
                alert(e.message);
            }
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
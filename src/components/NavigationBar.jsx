import React, {useEffect, useState} from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {GAMES_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {fetchUser} from "../api/UserApi";
import {getUsername} from "../utils/storage";
import {useErrorHandler} from "../hooks/useErrorHandler";

const NavigationBar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [type, setType] = useState('GUEST');
    const errorHandler = useErrorHandler();
    const GUEST = 'GUEST';
    const USER = 'USER';
    useEffect(() => {
        if (getUsername() !== null) {
            fetchUser(getUsername())
                .then(data => {
                    setUsername(data.username);
                    setType(USER);
                })
                .catch(e => errorHandler(e));
        }
    }, []);

    const handleButton = () => {
        if (type === USER) {
            localStorage.clear();
            setType(GUEST);
            navigate(GAMES_ROUTE);
        } else if (type === GUEST) {
            navigate(LOGIN_ROUTE);
        }

    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Generalov team</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#">{username}</Nav.Link>
                    <Button variant="outline-secondary" onClick={handleButton}>
                        {
                            type === GUEST ?
                                'Войти'
                                :
                                'Выйти'
                        }
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;


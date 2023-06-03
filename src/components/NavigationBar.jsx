import React, {useEffect} from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {GAMES_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {actionLogout} from "../store/reducers/auth/actionCreators";

const NavigationBar = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    const handleButton = () => {
        if (user !== null) {
            dispatch(actionLogout())
            navigate(GAMES_ROUTE);
        } else {
            navigate(LOGIN_ROUTE);
        }

    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Generalov team</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#">
                        {user && (
                            user.username
                        )}
                    </Nav.Link>
                    <Button variant="outline-secondary" onClick={handleButton}>
                        {
                            user === null ?
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


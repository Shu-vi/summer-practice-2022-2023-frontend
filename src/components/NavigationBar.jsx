import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const NavigationBar = (props) => {
    // Получаем имя пользователя из props
    const userName = props.userName;

    // Функция для выхода из аккаунта
    const handleLogout = () => {
        // Здесь можно добавить логику для выхода
        console.log('Вы вышли из аккаунта');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Generalov team</Navbar.Brand>
            {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#">{'userName'}</Nav.Link>
                    <Button variant="outline-secondary" onClick={handleLogout}>
                        Выйти
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;


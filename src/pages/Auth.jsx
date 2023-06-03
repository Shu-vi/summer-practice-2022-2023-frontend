import React, {useState} from 'react';
import {actionLoginUser} from "../store/reducers/auth/actionCreators";
import {Form, Button, Container} from 'react-bootstrap';
import {createUser} from "../api/UserApi";
import {useNavigate} from 'react-router-dom';
import {GAMES_ROUTE} from "../utils/consts";
import {useDispatch} from "react-redux";

function Auth() {
    const [type, setType] = useState('login');
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        city: '',
        district: ''
    });
    const dispatch = useDispatch();

    // Функция для обработки изменения полей ввода
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const clearData = () => {
        setData({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            city: '',
            district: ''
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === 'register') {
                await createUser({...data});
                setData({
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    city: '',
                    district: ''
                });
                alert('Регистрация прошла успешно');
            } else {
                dispatch(actionLoginUser({username: data.username, password: data.password}))
                navigate(GAMES_ROUTE);
            }
        } catch (e) {
            if (e.response.data.message) {
                alert(e.response.data.message)
            } else {
                alert(e.message);
            }
        }
    };

    const handleSwitch = () => {
        setType((prevType) => (prevType === 'login' ? 'register' : 'login'));
        clearData()
    };

    return (
        <Container className="mt-4">
            <h1>{type === 'login' ? 'Войти' : 'Зарегистрироваться'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {type === 'register' && (
                    <>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="firstName"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="lastName"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                type="city"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="district">
                            <Form.Label>Район</Form.Label>
                            <Form.Control
                                type="district"
                                name="district"
                                value={data.district}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </>
                )}
                <Button variant="primary" type="submit">
                    {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </Form>
            <p className="mt-3">
                {type === 'login'
                    ? 'Нет аккаунта? '
                    : 'Уже есть аккаунт? '}
                <a href="#" onClick={handleSwitch}>
                    {type === 'login'
                        ? 'Зарегистрироваться'
                        : 'Войти'}
                </a>
            </p>
        </Container>
    );
}

export default Auth;
import React, {useState} from 'react';
import {actionLoginUser} from "../store/reducers/auth/actionCreators";
import {Form, Button, Container} from 'react-bootstrap';
import {createUser} from "../api/UserApi";
import {useNavigate} from 'react-router-dom';
import {GAME_ROUTE, GAMES_ROUTE} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {useErrorHandler} from "../hooks/useErrorHandler";
import {fetchGameByUsername} from "../api/GameApi";
import '../index.css'

function Auth() {
    const [type, setType] = useState('login');
    const navigate = useNavigate();
    const error = useSelector(state => state.auth.error);
    const [data, setData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        city: '',
        district: ''
    });
    const dispatch = useDispatch();
    const errorHandler = useErrorHandler();
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
                clearData();
                alert('Регистрация прошла успешно');
            } else {
                dispatch(actionLoginUser({username: data.username, password: data.password}))
                    .then(user => {
                        if (user) {
                            return fetchGameByUsername(user.username)
                                .then(game => {
                                    if (game) {
                                        navigate(GAME_ROUTE + '/' + game.id);
                                    } else {
                                        navigate(GAMES_ROUTE);
                                    }
                                })
                        }
                    })
                    .catch(e => errorHandler(e));
            }
        } catch (e) {
            errorHandler(e);
        }
    };

    const handleSwitch = () => {
        setType((prevType) => (prevType === 'login' ? 'register' : 'login'));
        clearData()
    };

    return (
        <section className="vh-100" style={{/*background: "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))", */paddingTop: 50}}>
        <Container className="py-5 bg-dark text-white" style={{borderRadius: 20, width: 550}}>
            <h1 className="text-center" style={{fontFamily: "monospace", color: "white", fontSize: 35, fontWeight: "normal"}}>{type === 'login' ? 'Вход' : 'Регистрация'}</h1>
            <Form onSubmit={handleSubmit} style={{fontFamily: "monospace"}}>
                <Form.Group className="mt-5 mb-3 px-5 " controlId="username">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 px-5" controlId="password">
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
                        <Form.Group className="mb-3 px-5" controlId="firstName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="firstName"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="lastName">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="lastName"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="city">
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                type="city"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-5" controlId="district">
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
                <div className="d-flex justify-content-center">
                    <Button className=" btn btn-dark btn-outline-light btn-md px-5 mt-5 mb-4 mx-4" type="submit">
                        {type === 'login' ? 'Войти' : 'Создать аккаунт'}
                    </Button>
                </div>
            </Form>
            <p className="mt-3 text-center">
                {type === 'login'
                    ? 'Нет аккаунта? '
                    : 'Уже есть аккаунт? '}
                <a href="#" className="text-white-50 fw-bold " onClick={handleSwitch}>
                    {type === 'login'
                        ? 'Зарегистрироваться'
                        : 'Войти'}
                </a>
            </p>
        </Container>
        </section>
    );
}

export default Auth;
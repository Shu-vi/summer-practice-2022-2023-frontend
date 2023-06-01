import React, { useState } from 'react';
import {Button, Form, InputGroup, FormControl, Container} from 'react-bootstrap';
import MessageItem from "../components/MessageItem";

function Game(props) {
    // Получаем список сообщений из props
    const messages = [
        {
            id: 1,
            sender: 'Alex',
            date: '01.06.2023',
            time: '12:15',
            text: 'Привет, кто хочет поиграть?',
        },
        {
            id: 2,
            sender: 'Bob',
            date: '01.06.2023',
            time: '12:16',
            text: 'Я хочу, какая игра?',
        },
        {
            id: 3,
            sender: 'Charlie',
            date: '01.06.2023',
            time: '12:17',
            text: 'Давайте в шахматы',
        },
        {
            id: 4,
            sender: 'Diana',
            date: '01.06.2023',
            time: '12:18',
            text: 'Я тоже за шахматы',
        },
        {
            id: 4,
            sender: 'Diana',
            date: '01.06.2023',
            time: '12:18',
            text: 'Я тоже за шахматы',
        },
        {
            id: 4,
            sender: 'Diana',
            date: '01.06.2023',
            time: '12:18',
            text: 'Я тоже за шахматы',
        },
        {
            id: 4,
            sender: 'Diana',
            date: '01.06.2023',
            time: '12:18',
            text: 'Я тоже за шахматы',
        },
    ];


    // Создаем локальный стейт для текста сообщения
    const [text, setText] = useState('');

    // Функция для обработки изменения поля ввода
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    // Функция для обработки нажатия на кнопку "Покинуть игру"
    const handleLeave = () => {
        // Здесь можно добавить логику для покидания игры
        console.log('Вы покинули игру');
    };

    // Функция для обработки нажатия на кнопку "Отправить"
    const handleSubmit = (e) => {
        // Предотвращаем перезагрузку страницы
        e.preventDefault();
        // Здесь можно добавить логику для отправки сообщения
        console.log('Вы отправили сообщение:', text);
        // Очищаем поле ввода
        setText('');
    };

    return (
        <Container className="mt-4">
            <Button variant="danger" onClick={handleLeave}>
                Покинуть игру
            </Button>
            <div className="mt-3" style={{height: '70vh', overflowY: 'scroll', border: 'solid 1px black'}}>
                {messages.map((message) => (
                    <MessageItem message={message} key={message.id}/>
                ))}
            </div>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mt-3">
                    <FormControl
                        placeholder="Введите сообщение"
                        value={text}
                        onChange={handleTextChange}
                    />
                    <Button variant="primary" type="submit">
                        Отправить
                    </Button>
                </InputGroup>
            </Form>
        </Container>
    );
}

export default Game;
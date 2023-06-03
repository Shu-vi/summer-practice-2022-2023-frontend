import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, FormControl, Container} from 'react-bootstrap';
import MessageItem from "../components/MessageItem";
import {useParams} from "react-router-dom";
import {fetchPhrasesByGameId} from "../api/PhraseApi";

function Game() {
    const {id} = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetchPhrasesByGameId(id)
            .then(data => console.log(data))
            .catch(e => console.log(e));
    }, []);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleLeave = () => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
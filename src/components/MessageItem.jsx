import React from 'react';

const MessageItem = ({message, ...props}) => {
    return (
        <div className="m-2 p-2" style={{border: '1px solid black'}}>
            <p>
                <strong>{message.sender}</strong> ({message.date} {message.time})
            </p>
            <p>{message.text}</p>
        </div>
    );
};

export default MessageItem;
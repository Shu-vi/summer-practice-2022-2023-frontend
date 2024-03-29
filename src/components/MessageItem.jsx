import React from 'react';

const MessageItem = ({message, ...props}) => {

    const timestampToDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString();
        let day = date.getDate();
        day = day.toString().length === 1 ? '0' + day.toString() : day.toString();
        let hours = date.getHours();
        hours = hours.toString().length === 1 ? '0' + hours.toString() : hours.toString();
        let minutes = date.getMinutes();
        minutes = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    return (
        <div className="m-2 p-2" style={{border: '1px solid black'}}>
            <p>
                <strong>{message.user.firstName} {message.user.lastName}</strong> ({timestampToDate(message.phrase.timestamp)})
            </p>
            <p>{message.phrase.text}</p>
        </div>
    );
};

export default MessageItem;
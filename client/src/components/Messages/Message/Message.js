import React from 'react';

import './Message.css';
import ReactEmoji from 'react-emoji';
import ScrollToBottom from 'react-scroll-to-bottom';

const Message = ({ message: {text, user},name}) => {
    let isSentByCurrentUser = false;
    if (user === name){
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser 
            ? (
            <div className="messageContainer justifyEnd">
                <p className="sendText pr-10">{name}</p>
                <div className="messageBox backgroundBlue">
                    <p classname="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
};
export default Message;
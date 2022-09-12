import React, {useState, useEffect, useRef} from 'react';
import {useSearchParams, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import { socket } from '../helpers/socket';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import "./Chat.css";

const ENDPOINT = 'http://localhost:5000';



const Chat = () => {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const location = useLocation()
    // const [search, setSearch] = useSearchParams();
     
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
      //  socket = io(ENDPOINT, { transports : ['websocket'] });
        // const name = search.get("name");
        // const room = search.get("room");
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, (error) => {
           if (error) {
            alert(error)
           }
        });
        return () => {
            socket.off();
        };

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>

        </div> 
    )
}


export default Chat;
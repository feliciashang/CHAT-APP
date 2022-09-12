import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import './Login.css';

function Login  (){
    // passing empty string as initial name, and a setter function for it
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Login </h1>
                <div><input placeholder="Bob" className="loginInput" type = "text" onChange={(event) => setName(event.target.value)}/></div>
                <div><input placeholder="1" className= "loginInput mt-20" type = "text" onChange={(event) => setRoom(event.target.value)}/></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault(): null} to={'/chat?name='+name+'&room='+room}>
                <button className="button mt-20 " type = "submit"> Join  </button>
                </Link>
            </div>
        </div>
    )
}


export default Login;
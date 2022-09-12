const express = require('express');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./user.js');
const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
//const socketio = require('socket.io')(server, {cors: {origin: "*"}});
const io = require('socket.io')(server, {cors: {origin: "*"}});


io.on('connection', (socket) =>{
    socket.on('join', ({name, room}, callback) =>{
        console.log('user has joined')
        const { error, user} =  addUser({id: socket.id, name, room});
        if (error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: user.name + ' has joined'});
        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.rooom)})
        callback(); 
    });

    socket.on('sendMessage', (message, callback) => {
        console.log(socket.id)
        const user = getUser(socket.id)
        console.log(user);
        io.to(user.room).emit('message', {user: user.name, text: message});
        
        // do something on the frontend
        callback();
    });
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.rooom)});
        }
    })
});
//what is this router
app.use(router);

server.listen(PORT, () => console.log('Server has started on port ' +PORT));



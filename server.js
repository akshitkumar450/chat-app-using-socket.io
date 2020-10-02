const express = require('express')
const http = require('http')
const app = express();
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

app.use('/', express.static(__dirname + '/public'))

const users = {}

io.on('connection', (socket) => {

    socket.on('new-user-joined', (name) => {
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', (message) => {
        socket.broadcast.emit('rcv', { message: message, name: users[socket.id] })
    })

    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })
})

server.listen(5566, () => {
    console.log('server started');
})
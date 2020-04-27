const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

//The server is running on process.env.PORT or else port 5000
const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//socket is a connection who will run when we have a connection from our client instance
io.on('connection', (socket) => {
   
    //the function is a callback of the instance 'join'
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room})

        if(error) return callback(error)
        //welcoming message from chat to new user
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        //all in the room see the new user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`})

        socket.join(user.room)
        
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message})
        //this callback is connecting with the frontend
        callback()
    })
    //disconnect will run when we have a disconnect from our client instance
    socket.on('disconnect', () => {
        console.log('User had left!!!!')
})



})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

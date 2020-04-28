const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')


const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(cors())
app.use(router)

//socket is a connection who will run when we have a connection from our client instance
io.on('connection', (socket) => {
   
    //Function of the instance 'join', has a callback  with a error handling. 
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room})
        
        // Validation, if  name is taken or name and room are missing
        if(error) return callback(error)

        socket.join(user.room, () => {
            getAllRooms()
        })

        socket.join(user.room)

        //Welcoming message from chat to new user
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        
        //New user in the room message, all the other users in the room will get the message
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`})

        //emits all the users in specific room
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message})
        //this callback is connecting with the frontend
        callback()
    })

    //disconnect will run if user leaves room /if we have a disconnect from the client side
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      })
})

function getAllRooms() {
    console.log(io.sockets.socket)
}


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

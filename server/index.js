const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom, getAllOpenRooms, getAllClosedRooms } = require('./users.js')


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
    socket.on('join', ({ name, room, password }, callback) => {
        socket.leaveAll(); // leave socket.io room
     

        const { error, user } = addUser({ id: socket.id, name, room, password})
        
        // Validation, if  name is taken or name and room are missing
        if(error) return callback(error)

        socket.join(user.room, () =>{
             //Welcoming message from chat to new user
        socket.emit(
            'message', 
            { 
                user: 'admin', 
                text: `${user.name}, welcome to the room ${user.room}` 
            }
        )
        
        //New user in the room message, all the other users in the room will get the message
        socket.broadcast.to(user.room).emit(
            'message', 
            { 
                user: 'admin', 
                text: `${user.name}, has joined!`
            }   
        )

        //emits all the users in specific room
        io.to(user.room).emit(
            'usersInRoom', 
            { 
                room: user.room, 
                users: getUsersInRoom(user.room) ,
                password: user.password
            }
        );

        //Broadcast allRooms to all clients
        //the property allRooms must have the samme name as the client side socket.on (chat.js)
        // socket.on("allRooms", ({ allRooms }) => { setAllRooms(allRooms) })
        io.emit('allOpenRooms', 
            {
                // room: user.rooms,
                allOpenRooms: getAllOpenRooms()
            }
        )

        io.emit('allClosedRooms', 
            {
                allClosedRooms: getAllClosedRooms()
            }
        )
        callback()
        }) 
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        if (!user) return;

        io.to(user.room).emit('message', { user: user.name, text: message})
        //this callback is connecting with the frontend
        callback()
    })

    //disconnect will run if user leaves room /if we have a disconnect from the client side
    socket.on('leaveRoom', () => {
        
        const user = removeUser(socket.id);
        socket.leaveAll();
        //TODO!!!!!! begins
        console.log("*****************adapter", Object.keys(io.sockets.adapter.rooms))
        


        //TODO!!!!!! ends
        //console.log("disconnected ");
        console.log("user", user)
        //console.log(io.sockets.adapter)
        //console.log(io.sockets)
        if(user) {
          io.to(user.room).emit(
              'message', 
                { 
                  user: 'Admin', 
                  text: `${user.name} has left.` 
                }
            );
          io.to(user.room).emit(
              'roomData',  
                { 
                  room: user.room, 
                  users: getUsersInRoom(user.room)
                }
            );
        }

        //Broadcast all rooms to all clients
        io.emit('allOpenRooms', 
            {
                // room: user.rooms,
                allOpenRooms: getAllOpenRooms()
            }
        )

        io.emit('allClosedRooms', 
            {
                // room: user.rooms,
                allClosedRooms: getAllClosedRooms(user)
            }
        )
        
      })

      socket.on('disconnect', () => {
        
        const user = removeUser(socket.id);
        socket.leaveAll();
        //TODO!!!!!! begins
        console.log("*****************adapter", Object.keys(io.sockets.adapter.rooms))
        


        //TODO!!!!!! ends
        //console.log("disconnected ");
        console.log("user", user)
        //console.log(io.sockets.adapter)
        //console.log(io.sockets)
        if(user) {
          io.to(user.room).emit(
              'message', 
                { 
                  user: 'Admin', 
                  text: `${user.name} has left.` 
                }
            );
          io.to(user.room).emit(
              'roomData',  
                { 
                  room: user.room, 
                  users: getUsersInRoom(user.room)
                }
            );
        }

        //Broadcast all rooms to all clients
        io.emit('allOpenRooms', 
            {
                // room: user.rooms,
                allOpenRooms: getAllOpenRooms()
            }
        )

        io.emit('allClosedRooms', 
            {
                // room: user.rooms,
                allClosedRooms: getAllClosedRooms(user)
            }
        )
        
      })
})




server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

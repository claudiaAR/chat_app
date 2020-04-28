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
                users: getUsersInRoom(user.room) 
            }
        );

        //Broadcast allRooms to all clients
        //the property allRooms must have the samme name as the client side socket.on
        // socket.on("allRooms", ({ allRooms }) => { setAllRooms(allRooms) })
        io.emit('allRooms', 
            {
                allRooms: getAllRooms()
            }
        )

    //     io.emit('allClosedRooms', 
    //     {
    //         allClosedRooms: getAllClosedRooms()
    //     }
    // )
            
            callback()
        }) 
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
        socket.on('disconnect', () => {
            //Broadcast all rooms to all clients
            io.emit('roomsWriten', getAllRooms)
        })
      })
})

function getAllRooms() {
   const roomsAndSocketsIds = Object.keys(io.sockets.adapter.rooms)
   const socketsIds = Object.keys(io.sockets.sockets)
   const rooms = roomsAndSocketsIds.filter(roomOrId => !socketsIds.includes(roomOrId))
   
   console.log(rooms)
   return rooms
    // console.log(io.sockets.socket)
}

// function getAllClosedRooms(){
//     console.log(getAllClosedRooms())
// }


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

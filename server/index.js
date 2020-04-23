const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 3000
const app = express()
const server = http.creatServer(app)
const io = socketio(server)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

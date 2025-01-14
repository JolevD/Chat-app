import { Server } from "socket.io"
import express from "express"
import path from 'path';
import { fileURLToPath } from "url"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3500

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ['http://localhost:5500', 'http://127.0.0.1:5500'] // as we are in development phase we dont want other request comming on this node server
    }
})

io.on('connection', (socket) => {
    console.log(`User: ${socket.id} is connected`);

    // upon new connection - to user 
    socket.emit('message', "Welcome to the chat!")

    // upon connection - to other users
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} has joined!`)

    // listening for messages
    socket.on('message', (data) => {
        // console.log(data);
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })

    // when user disconnects
    socket.on('disconnect', () => {
        socket.broadcast.emit("message", ` User ${socket.id.substring(0, 5)} disconnected!`)
    })


    // listening for activity
    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)
    })

})

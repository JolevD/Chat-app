import { WebSocketServer } from "ws"

const server = new WebSocketServer({ port: "3000" })

server.on('connection', (socket) => {
    console.log("connected");
    socket.on('message', (message) => {
        const buff = Buffer.from(message)
        console.log(buff.toString())
        socket.send(`${message}`)
    })
})
import path from 'path'
import http from 'http'
import express, { Application } from 'express'
import redis from 'socket.io-redis'
import ioserver, { Socket, Server } from 'socket.io';

const app:Application = express()
const http_server = http.createServer(app)
const ios:Server = ioserver(http_server)
ios.adapter(redis({port: 6379 }))

app.use(express.static(path.join(__dirname, "build")))

ios.on('connection', (socket: Socket) => {
   socket.emit("login", {
      "name": "received :)"
   })
});

http_server.listen(80, () => {
   console.log('listening on *:80');
});

app.use((req:any, res:any, next:any) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});

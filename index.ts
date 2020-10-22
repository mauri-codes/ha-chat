import path from 'path'
import http from 'http'
import util from 'util'
import { createClient } from 'redis'
import redis_socket from 'socket.io-redis'
import express, { Application } from 'express'
import ioserver, { Socket, Server } from 'socket.io'

let app:Application = express()
let http_server = http.createServer(app)
let ios:Server = ioserver(http_server)
ios.adapter(redis_socket({ port: 6379 }))

app.use(express.static(path.join(__dirname, "build")))

let redis = createClient()
redis.on("connect", () => {
   console.log("connected to redis")
   redis.del(all_users, (err, ac) => {
      console.log(ac)
   })
})

interface ChatMessage {
   message: string
   recipient: string
}
interface User {
   username: string
   id: string
}

let redis_lpush = util.promisify(redis.lpush).bind(redis)
let redis_lpushx = util.promisify(redis.lpushx).bind(redis)
let redis_lrem = util.promisify(redis.lrem).bind(redis)
let redis_get = util.promisify(redis.get).bind(redis)
let redis_set = util.promisify(redis.set).bind(redis)
let redis_lrange = util.promisify(redis.lrange).bind(redis)
let all_users = "all_users"

ios.on('connection', (socket: Socket) => {
   let id = socket.id
   let user: User
   let user_key: string
   socket.on("register", async (username:string) => {
      user_key = `${username}..${id}`
      user = { username, id }
      redis.lpush(all_users, user_key, async function(err, data) {
         let users = await redis_lrange(all_users, 0, -1)   
         socket.emit(all_users, {users})
         socket.broadcast.emit(all_users, {users})
         console.log(`${user_key} connected`)
      })
   })
   socket.on("message", ({message, recipient}: ChatMessage) => {
      socket.to(recipient).emit("message", {from: user, message})
   })
   socket.on("disconnect", async () => {
      await redis_lrem(all_users, 0, user_key)
      let users = await redis_lrange(all_users, 0, -1)   
      socket.broadcast.emit(all_users, {users})
      console.log(`disconnected user: ${user_key}`)
   })
});
http_server.listen(80, () => {
   console.log('listening on *:80');
});

app.use((req:any, res:any, next:any) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});


const path = require("path");
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, "..", "server/build")));

io.on('connection', (socket: any) => {
  console.log('a user connected');
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});

app.use((req:any, res:any, next:any) => {
  res.sendFile(path.join(__dirname, "..", "server/build", "index.html"));
});

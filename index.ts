const path = require("path");
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, "build")));

io.on('connection', (socket: any) => {
  try {
    console.log('a user connected');
  } catch(e) {
    console.log("error")
    console.log(e)
  }
});

http.listen(80, () => {
  console.log('listening on *:80');
});

app.use((req:any, res:any, next:any) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

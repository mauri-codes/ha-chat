"use strict";
var path = require("path");
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname, "..", "server/build")));
io.on('connection', function (socket) {
    console.log('a user connected');
});
http.listen(3001, function () {
    console.log('listening on *:3001');
});
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, "..", "server/build", "index.html"));
});

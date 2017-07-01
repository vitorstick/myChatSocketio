var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ipAdress='http://185.13.90.140:8081/';
var userName = '';
// var io = require('socket.io')({
//   path:ipAdress
// });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    io.emit('chat response', 'Hello user ' + userName + ' Good luck');
  });
  
  socket.on('add user', function(user){
    console.log('login User '+ user);
    userName = user;
  });
    
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
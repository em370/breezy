var express = require('express');
var app = require('express')();
var uuid= require('tower-uuid');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
app.use(express.static('public'));

console.log(uuid());
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/signup', function(req, res){
	res.sendFile(__dirname + '/public/html/signup.html');
});

app.get('/test', function(req, res){
	res.sendFile(__dirname + '/public/html/test.html');
});

app.get('/signin', function(req, res){
	res.sendFile(__dirname + '/public/html/signin.html');
});

app.get('/chat', function(req, res){
	res.sendFile(__dirname + '/public/html/chat.html');
});

app.get('/aboutus', function(req, res){
	res.sendFile(__dirname + '/public/html/aboutus.html');
});

/*io.sockets.on('connection', function(socket){
	console.log('a user connected');
	socket.join('waitingroom');
	
}*/


server.listen(port, function(){
  console.log('listening on port: '+ port);
});

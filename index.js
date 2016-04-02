var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
app.use(express.static('public'));


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

server.listen(port, function(){
  console.log('listening on port: '+ port);
});

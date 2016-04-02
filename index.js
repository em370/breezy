var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html/home.html');
});

server.listen(port, function(){
  console.log('listening on port: '+ port);
});

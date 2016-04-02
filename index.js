var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
app.use(express.static('public'));


app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/test', function(req, res){
	res.sendFile(__dirname + '/public/html/test.html');
});

server.listen(port, function(){
  console.log('listening on port: '+ port);
});

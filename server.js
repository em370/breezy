// server.js
var express  = require('express');
var app      = require('express')();
var server   = require('http').createServer(app);
var port     = process.env.PORT || 3000;
var passport = require('passport');
var flash    = require('connect-flash');

var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var path              = require('path');
var favicon           = require('static-favicon');
var StormpathStrategy = require('passport-stormpath');
var stormpath         = require('express-stormpath');

var strategy = new StormpathStrategy();
passport.use(strategy);
passport.serializeUser(strategy.serializeUser);
passport.deserializeUser(strategy.deserializeUser);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//app.set('view engine', 'jade'); // set up jade for templating

app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({
	application: {
    href: 'https://api.stormpath.com/v1/applications/3fz13yjrvd7qe5oGgOD1by'
},
    secret: process.env.EXPRESS_SECRET,
    key: 'sid',
    cookie: {secure: false},
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/*
var index_routes = require('./routes/index');
var auth_routes = require('./routes/auth');
app.use('/', index_routes);
app.use('/', auth_routes);
*/

app.use(stormpath.init(app, {

  web: {
    login: {
      enabled: false
    },
    logout: {
      enabled: false
    },
    me: {
      enabled: false
    },
    oauth2: {
      enabled: false
    },
    register: {
      enabled: false
    }
  },
  expandCustomData: true
}));

//ROUTES===================================

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/test', function(req, res){
	res.sendFile(__dirname + '/public/html/test.html');
});

app.get('/chat', function(req, res){
	res.sendFile(__dirname + '/public/html/chat.html');
});

app.get('/signin', function(req, res){
	res.sendFile(__dirname + '/public/html/signin.html');
});

app.get('/signup', function(req, res){
	res.sendFile(__dirname + '/public/html/signup.html');
});
//LAUNCH===================================

server.listen(port, function(){
  console.log('listening on port: '+ port);
});

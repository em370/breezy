const fs = require('fs');
var Firebase = require('Firebase');
var translate = require('yandex-translate')("trnsl.1.1.20160402T034217Z.7ddc219970f6b6c9.323a12de2c42e5f2bf29acccc5bbd76682a610d2");

var ref = new Firebase('https://breezytalk.firebaseio.com');

$('document').ready(function(){
	$('.ui.accordion').accordion();
	var rooms = [];
	var myroom="";
	var socket=io();
	var name="";
	var runonce = false;
	$('.tabl').tab();

	var user = ref.getAuth();

	var usersRef = ref.child('users');
	if(!user)
	{
		window.location.href = "signin";
	}

	var meRef = usersRef.child(user.uid);
	meRef.on("value", function(snap){
		name = snap.val().username;
	});
	var gRef = meRef.child('groups');
	gRef.on('child_added', function(snap) {

		name =snap.val().username;
		$('#grouplist').append('<a class="ui inverted item tabl" data-tab="'+snap.val().name+'"> '+snap.val().name+' </a>');
		$('#lower').append('<div class="chatbox ui tab segment" data-tab="'+snap.val().name+'" id="ran"></div>');
		socket.emit('join', {room: snap.val().name});
		$('.tabl').tab();
		/*if(!runonce)
		{
			name=alert(snap.val().username);
			groupref = meRef.child('groups');
			groupref.on('value', function(csnap){
				csnap.forEach(function(ccsnap){
					alert(ccsnap.val().name);
					$('#grouplist').append('<a class="ui inverted item tabl" data-tab="'+ccsnap.val().name+'"> '+ccsnap.val().name+' </a>');
					$('#lower').append('<div class="chatbox ui tab segment" data-tab="'+ccsnap.val().name+'" id="ran"></div>');
					$('.tabl').tab();
				});
			});
			runonce = true;
		}*/
	});

	$('#random').click(function(){
		socket.emit('waiting');
	});

        $('#logout').click(function(){
		ref.unauth();
		window.location.href="signin";
	});

	$('#sender').click(function(){
		sendmess();
	});

	$('#groupbutton').click(function(){
		joingroup();
	});

	$('#groupinput').keydown(function(key)
	{
		if(key.which == 13)
		{
			joingroup();
		}
	});

	$('#messfield').keydown(function(key)
	{
		if(key.which == 13)
		{
			sendmess();
		}
	});

	$('body').on('click', '.tabl', function(event)
	{
		myroom = $(this).data('tab');
	});

	$('#addfriend').click(function()
	{
		$('#friendadder').modal('toggle');
	});

	$('#groupjoin').click(function()
	{
		$('#groupjoiner').modal('toggle');
	});

	$('#groupcancel').click(function()
	{
		$('#groupjoiner').modal('toggle');
	});
	socket.on('found', function(data){
		socket.emit('stop');
		socket.emit('join',{room: data.room, name: name});
		myroom=data.room;
		$('#ran').append('<p>You Found a Friend!<p>');
	});

	socket.on('gotmessage', function(data){
		translate.detect(data.message, function(err, res) {
	 		alert(res.lang);
		});
		newmessage(data);
	});

	function newmessage(data)
	{
		$("div[data-tab='"+ data.room + "']").append('<p>&#60'+data.name+'&#62'+data.message+'<p>');
		//$('#ran').append('<p>&#60'+data.name+'&#62'+data.message+'<p>');
		$("div[data-tab='"+ data.room + "']").scrollTop($("div[data-tab='"+data.room+"']").prop("scrollHeight"));
	}

	function sendmess()
	{
		var mess = $('#messfield').val();
		$('#messfield').val("");
		socket.emit('sentmessage', {message:mess, name:name, room:myroom});
	}
	function joingroup()
	{
		var newgroupname = $('#groupinput').val();
		meRef.child('groups').push().set({
			name: newgroupname
		});
		$('#groupjoiner').modal('toggle');
		$('#groupinput').val("");
	}
});

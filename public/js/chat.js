$('document').ready(function(){
	$('.ui.accordion').accordion();
	var rooms = [];
	var myroom="";
	var socket=io();
	var name="";
	name =prompt('enter your name');
	$('#random').click(function(){
		socket.emit('waiting');
	});

	$('#sender').click(function(){
		sendmess();
	});	
	
	$('#messfield').keydown(function(key)
	{
		if(key.which == 13)
		{
			sendmess();
		}
	});
	
	socket.on('found', function(data){
		socket.emit('stop');
		socket.emit('join',{room: data.room, name: name});
		myroom=data.room;
	});
	
	socket.on('gotmessage', function(data){
		newmessage(data);
	});
	
	function newmessage(data)
	{
		$('#ran').append('<p>&#60'+data.name+'&#62'+data.message+'<p>');
		$('#ran').scrollTop($('#ran').prop("scrollHeight"));
	}
	
	function sendmess()
	{
		var mess = $('#messfield').val();
		$('#messfield').val("");
		socket.emit('sentmessage', {message:mess, name:name, room:myroom});
	}
});
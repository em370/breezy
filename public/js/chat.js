$('document').ready(function(){
	$('.ui.accordion').accordion();
	var socket=io();
	$('#random').click(function(){
		alert('clicked');
		socket.emit('waiting');
	});
	socket.on('found', function(){
		alert('worked');
	});
});
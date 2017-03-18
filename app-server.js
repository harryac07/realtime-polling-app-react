var express = require('express');
var app = express();
var _=require('underscore');

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

// Handles all routes so you do not get a not found error
app.get('/audience', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});
var server = app.listen(3000);

//socket io 


var io = require('socket.io').listen(server);

var connections = []; // to store all the connections 
var title = "Some presentation";
var audience = [];

io.on('connection',function(socket){
	connections.push(socket);
	console.log("connected : "+connections.length+" sockets connected.");

	socket.on('join',function(data){
		var newMember={
			id:socket.id,
			name : data.name
		};

		audience.push(newMember); // push member objects in audience array

		socket.emit('joined',newMember); // give joined user to view/client to one socket
		io.emit('audience',audience); // broadcast to all audience members

	});

	socket.emit('welcome',{
		title:title
	});


	socket.on('disconnect',function(){

		var member = _.findWhere(audience,{id:socket.id}); // find user having this id
		if(member){
			audience.splice(audience.indexOf(member),1);
			io.emit('audience',audience); // broadcast to all audience members
			console.log(member.name + ' has disconnected!');
		}
		connections.splice(connections.indexOf(socket),1);
		socket.disconnect();
		console.log("disconnected : "+connections.length + " sockets remaining");
	});
});




var express = require('express');
var app = express();

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);

//socket io 


var io = require('socket.io').listen(server);

var connections = []; // to store all the connections 

io.on('connection',function(socket){
	connections.push(socket);
	console.log("connected : "+connections.length+" sockets connected.");

	socket.on('disconnect',function(){
		connections.splice(connections.indexOf(socket),1);
		socket.disconnect();
		console.log("disconnected : "+connections.length + " sockets remaining");
	});
});
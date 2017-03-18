var express = require('express');
var app = express();

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
var title = "untitled presentation";

io.on('connection',function(socket){
	connections.push(socket);
	console.log("connected : "+connections.length+" sockets connected.");

	socket.emit('welcome',{
		title:title
	});

	socket.on('disconnect',function(){
		connections.splice(connections.indexOf(socket),1);
		socket.disconnect();
		console.log("disconnected : "+connections.length + " sockets remaining");
	});
});
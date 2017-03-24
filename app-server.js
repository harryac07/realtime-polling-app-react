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
var title = "Untitled Presentation";
var audience = [];
var speaker = {};
var questions = require('./app-questions'); // array of questions
var currentQuestion=false;
var results={
	a: 0,
	b: 0,
	c: 0,
	d: 0
};

io.on('connection',function(socket){
	connections.push(socket);
	console.log("connected : "+connections.length+" sockets connected.");

	socket.on('join',function(data){
		var newMember={
			id:socket.id,
			name : data.name,
			type:'audience'
		};

		audience.push(newMember); // push member objects in audience array

		socket.emit('joined',newMember); // give joined user to view/client to one socket
		io.emit('audience',audience); // broadcast to all audience members

	});

	/* when speaker starts an event */
	socket.on('start',function(payload){ 
		speaker.name=payload.name;
		speaker.id=socket.id;
		speaker.type='speaker';
		title = payload.title;

		socket.emit('joined',speaker); // give joined user to view/client to one socket
		io.emit('start',{title:title,speaker:speaker.name});

		console.log('presentation started '+title+' by '+speaker.name);
	});

	socket.on('ask',function(question){
		currentQuestion = question;
		results={a:0,b:0,c:0,d:0};
		io.emit('ask',currentQuestion);
		console.log('Asked question : '+currentQuestion.q);
	});

	socket.on('answer',function(payload){
		results[payload.choice]++;
		io.emit('results',results);
		console.log('answer '+payload.choice+' \n '+JSON.stringify(results));
	});

	socket.emit('welcome',{
		title:title,
		audience:audience,
		speaker :speaker.name,
		questions:questions,
		currentQuestion:currentQuestion,
		results : results
	});


	socket.on('disconnect',function(){

		var member = _.findWhere(audience,{id:socket.id}); // find user having this id

		if(member){
			audience.splice(audience.indexOf(member),1);
			io.emit('audience',audience); // broadcast to all audience members
			console.log(member.name + ' has disconnected!');
		}else if(socket.id===speaker.id){
			console.log(speaker.name+" has left! "+title+" is over.");
			speaker={};
			title='Untitled Presentation';
			io.emit('end',{title:title,speaker:''});

		}
		connections.splice(connections.indexOf(socket),1);
		socket.disconnect();
		console.log("disconnected : "+connections.length + " sockets remaining");
	});
});




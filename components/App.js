var React = require('react');
var Router = require('react-router');

var io = require('socket.io-client');
var Header = require('./parts/Header');
var App = React.createClass({
	getInitialState (){
		return {
			status : "disconnected",
			title : "",
			member:{},
			audience :[],
			speaker : ""
		};
	},
	componentWillMount(){
		this.socket= io('http://localhost:3000');
		this.socket.on('connect',this.connect);
		this.socket.on('welcome',this.updateState);
		this.socket.on('disconnect',this.disconnect);
		this.socket.on('joined',this.joined);
		this.socket.on('audience',this.updateAudience);
		this.socket.on('start',this.start);
		this.socket.on('end',this.updateState);
	},
	emit(eventName,data) {
		this.socket.emit(eventName,data);
	},
	connect(){
		var member=(sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
		if(member && member.type==='audience'){
			this.emit('join',member);
		}else if(member && member.type==='speaker'){
			this.emit('start',{name:member.name,title:sessionStorage.title})
		}
		this.setState({
			status : 'connected'
		});
	},
	disconnect(){
		this.setState({
			status : 'disconnected',
			title : 'disconnected',
			speaker:''
		});
	},
	updateState(serverState){
		this.setState(serverState);

	},
	joined(member) {
		sessionStorage.member=JSON.stringify(member);
		this.setState({
			member:member
		});
	},
	updateAudience(audience){
		this.setState({
			audience:audience
		});
	},
	start(presentation) {
		if(this.state.member.type==='speaker'){
			sessionStorage.title=presentation.title;
		}
		this.setState(presentation);
	},
	render (){
        var children = React.Children.map(
           this.props.children,
           child => React.cloneElement(child,
	            { 
	              title:this.state.title,
	              status: this.state.status,
	              member :this.state.member,
	              emit : this.emit,
	              audience:this.state.audience,
	              speaker : this.state.speaker
	            }
	        )
        );

		return (
			<div>
				<Header {...this.state} />
				<hr />
                {children}		
            </div>
		);
	}
});

module.exports=App;
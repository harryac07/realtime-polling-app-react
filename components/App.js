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
			audience :[]
		};
	},
	componentWillMount(){
		this.socket= io('http://localhost:3000');
		this.socket.on('connect',this.connect);
		this.socket.on('welcome',this.welcome);
		this.socket.on('disconnect',this.disconnect);
		this.socket.on('joined',this.joined);
		this.socket.on('audience',this.updateAudience);
	},
	emit(eventName,data) {
		this.socket.emit(eventName,data);
	},
	connect(){
		var member=(sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
		if(member){
			this.emit('join',member);
		}
		this.setState({
			status : 'connected'
		});
	},
	disconnect(){
		this.setState({
			status : 'disconnected'
		});
	},
	welcome(serverState){
		this.setState({title:serverState.title});

	},
	joined(member) {
		this.setState({
			member:member
		});
		sessionStorage.member=JSON.stringify(member);
	},
	updateAudience(audience){
		this.setState({
			audience:audience
		});
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
	              audience:this.state.audience
	            }
	        )
        );

		return (
			<div>
				<Header title={this.state.title} status={this.state.status} />
				<hr />
                {children}		
            </div>
		);
	}
});

module.exports=App;
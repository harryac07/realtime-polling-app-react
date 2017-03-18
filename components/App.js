var React = require('react');
var Router = require('react-router');

var io = require('socket.io-client');
var Header = require('./parts/Header');
var App = React.createClass({
	getInitialState (){
		return {
			status : "disconnected",
			title : ""
		};
	},
	componentWillMount(){
		this.socket= io('http://localhost:3000');
		this.socket.on('connect',this.connect);
		this.socket.on('welcome',this.welcome);
		this.socket.on('disconnect',this.disconnect);
	},
	connect(){
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
	render (){
        var children = React.Children.map(
           this.props.children,
           child => React.cloneElement(child,
	            { 
	              title:this.state.title,
	              status: this.state.status
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
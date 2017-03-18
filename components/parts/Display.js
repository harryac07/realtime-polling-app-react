var React = require('react');
// var Router= require('react-router');

var Display = React.createClass({
	render() {
		return(this.props.if) ? <div>{this.props.children}</div>:null;
	}
});
module.exports=Display;
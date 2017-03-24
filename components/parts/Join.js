var React = require('react');
var Router= require('react-router');
var Link = Router.Link;

var Join=React.createClass({

	join(e) {
		e.preventDefault();
		var memberName =this.refs.name.value;
		this.props.emit('join',{
			name : memberName
		});
	},
	render() {
		return(
			<form action="javascript:void(0)" onSubmit={this.join}>
				<label htmlFor="fullname">Name</label>
				<input ref="name" className="form-control" placeholder="enter name" required />
				<button className="btn btn-primary"> JOIN </button>
				<br />
				<Link to="/speaker">Start the presentation</Link>
				<Link to="/board">Go to the board</Link>
			</form>
		);
	}
});

module.exports=Join;
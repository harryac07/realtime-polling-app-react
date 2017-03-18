var React = require('react');

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
				<label htmlFor="fullname"></label>
				<input ref="name" className="form-control" placeholder="enter name" required />
				<button className="btn btn-primary"> JOIN </button>
			</form>
		);
	}
});

module.exports=Join;
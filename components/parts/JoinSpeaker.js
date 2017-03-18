var React = require('react');

var JoinSpeaker=React.createClass({

	start(e) {
		e.preventDefault();
		var speakerName= this.refs.name.value;
		var title = this.refs.title.value;
		this.props.emit('start',{
			name:speakerName,
			title:title
		})
	},
	render() {
		return(
			<form action="javascript:void(0)" onSubmit={this.start}>
				<label htmlFor="fullname">name</label>
				<input ref="name" className="form-control" placeholder="enter name" required />

				<label htmlFor="title">Presentation Title</label>
				<input ref="title" className="form-control" placeholder="enter a title..." required />

				<button className="btn btn-primary"> JOIN </button>
				
			</form>
		);
	}
});

module.exports=JoinSpeaker;
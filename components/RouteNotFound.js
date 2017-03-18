var React = require('react');
var Router= require('react-router');
var Link = Router.Link;

var RouteNotFound = React.createClass({
	render() {
		return(
			<div id="not-found">
				<h1>Page Not Found!</h1>
				<br />
				<p>
					You may want to visit these links below:
					<br />
					<Link to="/">Join as Audience</Link>
					<Link to="/speaker">Start the Presentation</Link>
					<Link to="/board">View the Board</Link>
				</p>
			</div>
		);
	}
});

module.exports= RouteNotFound;
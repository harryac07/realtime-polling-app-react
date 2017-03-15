var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var createHistory = require('history').createBrowserHistory;

var history = createHistory();
var App = require('./components/App');
var Audience = require('./components/Audience');
var Speaker = require('./components/Speaker');
var Board = require('./components/Board');


ReactDOM.render(
	<Router history={history}>
		<Route path="/" component={App} >
			<Route path="/audience" component={Audience} />
			<Route path="/speaker" component={Speaker} />
			<Route path="/board" component={Board} />
		</Route>
	</Router>,
	document.getElementById('react-container')
);

// ReactDOM.render(
// 	<Router history={history}>
// 		<Route component={App} />
// 	</Router>,
// 	document.getElementById('react-container')
// );


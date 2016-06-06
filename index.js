var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Root = require('./components/Root').default;
var browserHistory = require('react-router').browserHistory;
var history = require('react-router').history;
var render = require('react-dom').render;
var map = require('./map.js');

window.initMap = map;

render((
  <Router history={ browserHistory }>
     <Route path="/" component={ Root }>
    </Route>  
  </Router>
), document.querySelector('#react-container'));


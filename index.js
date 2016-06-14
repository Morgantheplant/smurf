var React = require('react');
var Router = require('react-router').Router;
var Provider = require('react-redux').Provider;
var Route = require('react-router').Route;
var Root = require('./components/Root').default;
var browserHistory = require('react-router').browserHistory;
var history = require('react-router').history;
var render = require('react-dom').render;
var map = require('./map.js');

var store = require('./reducers/rootStore').default;

window.initMap = map;

render((
  <Provider store={store}>
    <Router history={ browserHistory }>
      <Route path="/" component={ Root }>
      </Route>  
    </Router>
  </Provider>  
), document.querySelector('#react-container'));


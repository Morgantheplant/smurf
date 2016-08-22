var React = require('react');
var Router = require('react-router').Router;
var Provider = require('react-redux').Provider;
var Route = require('react-router').Route;
var RootContainer = require('./containers/RootContainer').default;
import { browserHistory } from 'react-router'
var history = require('react-router').history;
var render = require('react-dom').render;
var Map = require('./map');
var startSim = require('./mainAnimation');

var store = require('./reducers/rootStore').default;
var map = new Map()
window.initMap = map.initMap.bind(map);

render((
  <Provider store={store}>
    <Router history={ browserHistory }>
      <Route path="/" component={ RootContainer }>
      </Route>  
      <Route path="/:surfspot" component={ RootContainer }>
      </Route>
    </Router>
  </Provider>  
), document.querySelector('#react-container'));


import React from "react";
import { render } from "react-dom";
import MapContainer from './containers/MapContainer'
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import store from "./reducers/rootStore";

window.initReact = function initReact(){  
  return render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={MapContainer} />
        <Route path="/:surfspot" component={MapContainer} />
      </Router>
    </Provider>
  ), document.getElementById('react-container'));
}

import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { render } from "react-dom";
import RootContainer from "./containers/RootContainer";
import Map from "./map";
import store from "./reducers/rootStore";

window.initMap = function initMap(){
  window._googMap = new Map();
  initReact();
  return null
};

function initReact(map){
  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={RootContainer} />
        <Route path="/:surfspot" component={RootContainer} />
      </Router>
    </Provider>
  ), document.querySelector("#react-container"));
}


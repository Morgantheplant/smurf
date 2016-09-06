import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import RootContainer from "./containers/RootContainer";
import { render } from "react-dom";
import Map from "./map";
import startSim from "./mainAnimation"
import store from "./reducers/rootStore";

const map = new Map()
window.initMap = map.initMap.bind(map);

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={RootContainer} />
      <Route path="/:surfspot" component={RootContainer} />
    </Router>
  </Provider>
), document.querySelector("#react-container"));


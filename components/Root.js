import React from 'react';
import classNames from 'classnames';
import ClockContainer from '../containers/ClockContainer';
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions';
import { browserHistory } from "react-router";
import TidesContainer from '../containers/TidesContainer';
import SurfReportContainer from '../containers/SurfReportContainer';
import CloseButton from '../containers/CloseButton';
import mainAnimationLoop from '../mainAnimationLoop';
import startSim from '../mainAnimation';

import store from '../reducers/rootStore';

class Root extends React.Component {
  componentDidMount(){
    mainAnimationLoop.start();
    mainAnimationLoop.setAnimationInterval(function(){
       store.dispatch(clockTick())
    }, 1000)    
  }
  close() {
    browserHistory.push("/");
  }
  render() {
    let loc = this.props.surfspot ? this.props.surfspot.spot : null;
    if(loc){
      let map = initMap.mapInstance;
      map.addSingleBoundsListener(startSim, loc);
      map.changeLoc(loc)
    } else {
      console.log('got here', loc, this.props.surfspot)
    }

    return (
      <div>
        {
          (this.props.surfspot ?
            (<div>
            <TidesContainer surfData={this.props.surfspot}/> 
            <ClockContainer surfData={this.props.surfspot}/>
            <SurfReportContainer surfData={this.props.surfspot}/>
            <CloseButton onClose={this.close.bind(this)}/>
          </div>) :null) 
        } 
      </div>
    )
  }
}


export default Root;


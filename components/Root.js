import React from 'react';
import classNames from 'classnames';
import ClockContainer from '../containers/ClockContainer';
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions';
import { browserHistory } from "react-router";
import TidesContainer from '../containers/TidesContainer';
import SurfReportContainer from '../containers/SurfReportContainer';
import CloseButton from '../components/CloseButton';
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
    let loc = this.props.surfspot;
    if(loc){
      let map = initMap.mapInstance;
      map.addSingleBoundsListener(startSim, loc);
      map.changeLoc(loc)
    }
    startSim(this.props.surfspot)
  
    return (
      <div>
        {
          (this.props.surfData ?
            (<div>
            <TidesContainer surfData={this.props.surfData}/> 
            <ClockContainer surfData={this.props.surfData}/>
            <SurfReportContainer surfData={this.props.surfData}/>
            <CloseButton onClose={this.close.bind(this)}/>
          </div>) :null) 
        } 
      </div>
    )
  }
}


export default Root;


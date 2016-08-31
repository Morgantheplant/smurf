import React from 'react';
import classNames from 'classnames';
import ClockContainer from '../containers/ClockContainer';
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions';
import TidesContainer from '../containers/TidesContainer';
import SurfReportContainer from '../containers/SurfReportContainer';
import mainAnimationLoop from '../mainAnimationLoop';
import startSim from '../mainAnimation';

import store from '../reducers/rootStore';

class Root extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    
    let loc = this.props.surfspot ? this.props.surfspot.spot : null;
    if(loc){
      let map = initMap.mapInstance;
      map.addSingleBoundsListener(startSim, loc);
      map.changeLoc(loc)
    }

    return (
      <div>
        {
          (this.props.surfspot ?
            (<div>
            <TidesContainer surfData={this.props.surfspot}/> 
            <ClockContainer surfData={this.props.surfspot}/>
            <SurfReportContainer surfData={this.props.surfspot}/>
          </div>) :null) 
        } 
      </div>
    )
  }
  componentDidMount(){
    mainAnimationLoop.start();
    mainAnimationLoop.setAnimationInterval(function(){
       store.dispatch(clockTick())
    }, 1000)    
  }
  
  componentWillUpdate(){
    //debugger
    
  }
}


export default Root;


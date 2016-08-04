import React from 'react'
import classNames from 'classnames'
import ClockContainer from '../containers/ClockContainer'
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions'
import TidesContainer from '../containers/TidesContainer'
import SurfReportContainer from '../containers/SurfReportContainer'
import mainAnimationLoop from '../mainAnimationLoop';
import startSim from '../mainAnimation';

var store = require('../reducers/rootStore').default;

class Root extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        {
          (this.props.params.surfspot ?
            (<div>
            <ClockContainer />  
            <SurfReportContainer />  
            <TidesContainer /> 
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
    let loc = this.props.params.surfspot;
    if(loc){
      let map = initMap.mapInstance;
      map.changeLoc(loc)
      map.getMap().addListener('bounds_changed',function(){
        startSim(loc);
      })
    }
  }
 
}

export default Root;


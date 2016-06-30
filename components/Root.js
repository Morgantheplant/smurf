import React from 'react'
import classNames from 'classnames'
import ClockContainer from '../containers/ClockContainer'
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions'
import Tides from './Tides'
import SurfReportContainer from '../containers/SurfReportContainer'
import mainAnimationLoop from '../mainAnimationLoop';

var store = require('../reducers/rootStore').default;


class Root extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Tides /> 
        <ClockContainer />
        <SurfReportContainer />
      </div>
      )
  }
  componentDidMount(){
    mainAnimationLoop.start();
    debugger
    mainAnimationLoop.setAnimationInterval(function(){
       store.dispatch(clockTick())
    }, 1000)    
  }
 
}

export default Root;


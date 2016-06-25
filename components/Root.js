import React from 'react'
import classNames from 'classnames'
import ClockContainer from '../containers/ClockContainer'
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions'
import Tides from './Tides'
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
      </div>
      )
  }
  componentDidMount(){
    mainAnimationLoop.start();
    mainAnimationLoop.setAnimationInterval(function(){
       store.dispatch(clockTick())
    }, 1000)    
  }
 
}

export default Root;


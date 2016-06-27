import React from 'react'
import classNames from 'classnames'
import ClockContainer from '../containers/ClockContainer'
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions'
import Forecast from '../components/Forecast'
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
        <Forecast 
          width={800} 
          height={500}
          parentWidth={800}
          parentHeight={500} 
          />
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


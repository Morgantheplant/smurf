import React from 'react'
import classNames from 'classnames'
import ClockContainer from '../containers/ClockContainer'
import { connect } from 'react-redux';
import { clockTick } from '../actions/clockActions'
var store = require('../reducers/rootStore').default;
var startSim = require('../mainAnimation');

class Root extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
     return (
       <div>
         <ClockContainer />
       </div>
      )
  }
  componentDidMount(){
    var started = false;

    function timeLoop(){
      // hack to start sim after loaded
      if(!started && window.loaded){
        started = true;
        startSim();
      }
      // call that runs the clock component
      store.dispatch(clockTick())
      setTimeout(function(){
        timeLoop();
      },1000);  
    }

    timeLoop();
  }
 
}

export default Root;


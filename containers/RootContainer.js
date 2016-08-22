import React from 'react'
import Root from '../components/Root'
import startSim from '../mainAnimation';
// import { clockTick } from '../actions/clockActions'
// import mainAnimationLoop from '../mainAnimationLoop';
var store = require('../reducers/rootStore').default;
var dataBuilder = require('../dataBuilder.js');

let RootContainer = React.createClass({

  getInitialState () {
    return {
      spot: null, 
      data: null
    }
  },

  componentDidMount () {
    // fetch data initially in scenario 2 from above
    this.updateSpot()
  },

  componentDidUpdate (prevProps) {
    // respond to parameter change 
    let oldSpot = prevProps.params.surfspot
    let newSpot = this.props.params.surfspot
    if (newSpot !== oldSpot){
      debugger
      this.updateSpot()
    }
  },

  componentWillUnmount () {
    // allows us to ignore an inflight request
    this.ignoreUpdate = true
  },

  updateSpot () {
    let loc = this.props.params.surfspot;
    if(!this.ignoreUpdate){
      $.get( "/data/" + loc, function( data ) {
        console.log(data, "this is the data")
        this.setState({
          surfspot: { 
            spot:loc, 
            data: dataBuilder(data)
          } 
        });
        
      }.bind(this), "json" );
    }
  },

  render () {
    return <Root surfspot={this.state.surfspot}/>
  }
})

export default RootContainer;
import React from 'react';
import Root from '../components/Root';
import startSim from '../mainAnimation';

import store from '../reducers/rootStore';
import dataBuilder from '../dataBuilder.js';

//todo: change to class extends
let RootContainer = React.createClass({

  getInitialState () {
    console.log(1)
    return {
      surfspot: window._INITIAL_SETTINGS_.spot || null, 
      data: {}
    }
  },

  componentDidMount () {
    console.log(2)
    // fetch data initially in scenario 2 from above
    this.updateSpot()
  },

  componentDidUpdate (prevProps) {
    // respond to parameter change 
    let oldSpot = prevProps.params.surfspot
    let newSpot = this.props.params.surfspot
    if (newSpot !== oldSpot){
      this.updateSpot()
      console.log("old spot: ", oldSpot,"new spot:", newSpot)
    }
    if(!newSpot){
    console.log(newSpot, "why is this undefined?")
    }
  },

  componentWillUnmount () {
    // allows us to ignore an inflight request
    this.ignoreUpdate = true
  },

  updateSpot () {
    console.log(3)
    let loc = this.props.params.surfspot;
    console.log(loc, "this is the spot")
    if(!this.ignoreUpdate){
      $.get( "/data/" + loc, function( data ) {
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
    console.log(this.state.surfspot, "rendering root");
    return <Root surfspot={this.state.surfspot}/>
  }
})

export default RootContainer;
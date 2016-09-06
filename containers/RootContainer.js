import React from 'react';
import Root from '../components/Root';
import startSim from '../mainAnimation';

import store from '../reducers/rootStore';
import dataBuilder from '../dataBuilder.js';

//todo: change to class extends
let RootContainer = React.createClass({

  getInitialState () {
    return {
      surfspot: window._INITIAL_SETTINGS_.spot || null, 
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
      this.updateSpot()
    }
  },

  componentWillUnmount () {
    // allows us to ignore an inflight request
    this.ignoreUpdate = true
  },

  updateSpot () {
    let loc = this.props.params.surfspot;
    if(!this.ignoreUpdate && loc){
      $.get( "/data/" + loc, function( data ) {
        this.setState({
          surfspot:loc, 
          data: dataBuilder(data)
        });
      }.bind(this), "json" );
    } else if (!loc){
      this.setState({
        surfspot:null,
        data: null
      })
    }
  },

  render () {
    console.log(this.state.surfspot, this.state.data,"rendering root");
    return <Root surfspot={this.state.surfspot} surfData={this.state.data} />
  }
})

export default RootContainer;
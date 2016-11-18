import React from 'react';
import MapComponent from '../components/MapComponent';

let initialCenter = {"lat": 37.309, "lng": -122.400};

let MapContainer = React.createClass({

  getInitialState () {
    return {
      surfspot:null, 
      data: null
    }
  },

  componentDidMount() {
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
        var item = dataBuilder(data);
        this.setState({
          surfspot:loc, 
          data: item
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
    return ( <MapComponent 
              initialCenter={initialCenter}
              surfspot={this.state.surfspot} 
              surfData={this.state.data} 
              />);
  }
})

export default MapContainer;
import React from 'react';
import MapComponent from '../components/MapComponent';

let initialCenter = { lng: -90.1056957, lat: 29.9717272 }

let MapContainer = React.createClass({

  getInitialState () {
    return {
      surfspot: window._INITIAL_SETTINGS_.spot || null, 
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
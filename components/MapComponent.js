import React from "react";
import { render } from "react-dom";
import styles from"../styles/mapstyles.js";
import { browserHistory } from "react-router";
import SurfReportContainer from "../containers/SurfReportContainer"
import ClockContainer from '../containers/ClockContainer';
import CloseButton from '../components/CloseButton';
import { startSim, clearSim } from '../mainAnimation';
import TideComp from './TideComp';
import TidesContainer from '../containers/TidesContainer';

class MapComponent extends React.Component {
  constructor(props){
    super(props)
    this.addMarkers = this.addMarkers.bind(this);
    this.state = {  //todo: remove state here
      locationsAdded: false
    }

  }
  componentDidMount() {
    this.map = this.createMap()
    google.maps.event.addListenerOnce(this.map, 'idle', this.props.getLocations);

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.locations.length && !this.state.locationsAdded){
      this.setState({locationsAdded: true});
      this.addMarkers(nextProps.locations);
    }
    // update map location
    const { surfData } = nextProps;
    if(surfData){
      google.maps.event.addListenerOnce(this.map, 'bounds_changed', function(){
         startSim(surfData);
      });
      this.map.panTo(new google.maps.LatLng(
        surfData.lat,
        surfData.lon
      ))
    } else {
      clearSim();
    }
    
  }

  addMarkers(surfSpots){
    google.maps.event.removeListener(this.initListener)
    for (let i = 0, len = surfSpots.length; i < len; i++) {
      let spot = surfSpots[i];
      setTimeout(()=>{
        this.addSpotMarker(spot)
      },i * 200);
    }
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(this.map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: 6,
      center: this.mapCenter(),
      styles: styles
    }
    return new google.maps.Map(this.mapNode, mapOptions)

  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )
  }

  addSpotMarker(loc){
    let spot = new google.maps.Marker({
      position: { lat:+loc.lat, lng:+loc.lon}, 
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: "white",
        fillOpacity: 1,
        strokeWeight: 0
      },
      optimized: false, // stops the marker from flashing
      animation: google.maps.Animation.DROP,
      map: this.map
    });
    spot.details = loc;
    spot.addListener("click", ()=> {
      this.map.setZoom(6);
      browserHistory.push(loc.spot)
    });
    //this.markers.push(spot);       
 }

  createMarker() {
    return new google.maps.Marker({ 
      position: this.mapCenter(),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: "white",
        fillOpacity: 1,
        strokeWeight: 0
      },
      animation: google.maps.Animation.DROP,
      map: this.map
    });
  }

  render() {
    const { surfData } = this.props;
    return (
      <div className='base-container'>
        <div id='map' ref={(map) => this.mapNode = map} />

        { 
          (surfData && surfData.forecast  ?
              <SurfReportContainer surfData={this.props.surfData.forecast} /> : null) 
        }
        {
           (surfData ? <CloseButton onClose={this.props.close} /> : null)
          
        }
        { 
          (surfData && surfData.tidesData  ?
             <TidesContainer surfData={this.props.surfData}/>  : null)
        }
        <ClockContainer />
      </div>);
  }
  
}

export default MapComponent;

import React from "react";
import { render } from "react-dom";
import styles from"../styles/mapstyles.js";
import surfData from "../data";
import surfDataBuilder from "../data/surfDataBuilder";
import { browserHistory } from "react-router";

let surfSpots = surfDataBuilder(surfData);

class MapComponent extends React.Component {
  constructor(props){
    super(props)
    this.addMarkers = this.addMarkers.bind(this);

  }
  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
    //this.marker = this.createMarker()
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
    this.initListener = this.map.addListener('bounds_changed', this.addMarkers)
  }

  handleZoomChange(){
    console.log('helllllooo')
  }

  addMarkers(){
    google.maps.event.removeListener(this.initListener)
    setTimeout(()=>{
      for (let i = 0, len = surfSpots.length; i < len; i++) {
        let spot = surfSpots[i];
        setTimeout(()=>{
          this.addSpotMarker(spot)
        },i * 300);
      }
    }, 1200)
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
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
    return (<div id='map' ref={(map) => this.mapNode = map} />)
  }
  
}

export default MapComponent;

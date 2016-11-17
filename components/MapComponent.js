import React from "react";
import { render } from "react-dom";

class MapComponent extends React.Component {
  constructor(props){
    super(props)
    this.mapCenter = this.mapCenter.bind(this);
  }
  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
    this.marker = this.createMarker()
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
  }

  handleZoomChange(){
    console.log('helllllooo')
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: 8,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.mapNode, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    })
  }

  render() {
    return (<div id='map' ref={(map) => this.mapNode = map} />)
  }
  
}

export default MapComponent;

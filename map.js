import { browserHistory } from "react-router";
import API_KEY from"./config.js";
import styles from"./styles/mapstyles.js";
// todo load this from separate data source
import surfData from "./data";
import surfDataBuilder from "./data/surfDataBuilder";
let surfSpots = surfDataBuilder(surfData);

function Map(){
  this.markers = [];
  // init the map instance
  this.map = new google.maps.Map(document.getElementById("map"), {
    center: window._INITIAL_SETTINGS_.center,
    disableDefaultUI: true,
    zoom: 6
  });

  this.map.setOptions({styles: styles});
  
  // drop the markers when the map loads
  this.map.addListener("bounds_changed", ()=> {
    for (let i = 0, len = surfSpots.length; i < len; i++) {
      let spot = surfSpots[i];
      setTimeout(()=>{
        this.addSpotMarker(spot)
      },i * 100);
    }
  });

  return this
}

Map.prototype.getMap = function getMap(){
  return this.map;
}

Map.prototype.addSpotMarker = function addSpotMarker(loc){
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
  this.markers.push(spot);       
}

Map.prototype.changeLoc = function changeLoc(loc){
  if(loc){
    for (var i = 0, len = this.markers.length, marker; i < len; i++) {
      marker = this.markers[i];
      if(marker.details && marker.details.spot === loc){
        this.map.panTo(marker.getPosition())
        return;
      }
    }
    this.map.panTo(window._INITIAL_SETTINGS_.center)
  }
}


Map.prototype.addSingleBoundsListener = function addSingleListener(cb, param){
  let called = false;
  let listener = this.map.addListener("bounds_changed", ()=>{
    if(!called){
      called = true;
      cb(param)
    } else {
      google.maps.event.removeListener(listener);
    }
  });
}


module.exports = Map;
import { browserHistory } from 'react-router'
var API_KEY = require('./config.js');
var styles = require('./styles/mapstyles.js');
var startSim = require('./mainAnimation.js')
// todo load this from separate data source
let surfSpots = require('./data/surfSpots');
//let surfSpots = [{spot: "ob",lat: 37.809, lng: -122.500}, {spot: "sc",lat: 36.950127, lng: -122.026017}, {spot: "bigsur",lat: 36.29649, lng: -121.889544}, {spot: "morro",lat: 35.371313, lng: -120.869593}, {spot: "rincon",lat: 34.372669, lng: -119.447469}, {spot: "la",lat: 34.000145, lng: -118.804716}]

function Map() {
  this.locations = [];
  this.loaded = false;
}

Map.prototype.initMap = function initMap(){
  this.map = new google.maps.Map(document.getElementById('map'), {
    center: window._INITIAL_SETTINGS_.center,
    disableDefaultUI: true,
    zoom: 6
  });
  this.map.setOptions({styles: styles});
  this.map.addListener('bounds_changed', function(){
    if(!this.loaded){
      this.loaded = true;
      for (let i = 0; i < surfSpots.length; i++) {
        let spot = surfSpots[i];
        setTimeout(function(){
          this.addSpotMarker(spot)
        }.bind(this),i * 100);
      }
    }
    if(window._INITIAL_SETTINGS_.spot !== "root"){
      startSim(window._INITIAL_SETTINGS_.spot)
    }
  }.bind(this));
  //assign instance to global 
  window.initMap.mapInstance = this;
}

Map.prototype.getMap = function getMap(){
  return this.map;
}

Map.prototype.addSpotMarker = function addSpotMarker(loc){
  let spot = new google.maps.Marker({ 
    position: { lat:loc.lat, lng:loc.lng},
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
  spot.addListener('click', function() {
    this.map.setZoom(6);
    browserHistory.push(loc.spot)
  }.bind(this));
  this.locations.push(spot);       
}

Map.prototype.changeLoc = function changeLoc(loc){
  let spot = this.locations.filter(function(item){
    return item.details && item.details.spot === loc;
  })
  if(spot.length){
    this.map.panTo(spot[0].getPosition());
  }
}

module.exports = Map;
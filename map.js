import { browserHistory } from 'react-router'
var API_KEY = require('./config.js');
var styles = require('./styles/mapstyles.js');
var startSim = require('./mainAnimation.js')
// todo load this from separate data source

let surfData = require('./data');
let surfDataBuilder = require('./data/surfDataBuilder');
let surfSpots = surfDataBuilder(surfData);

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
    let hasPath = window._INITIAL_SETTINGS_.spot !== "root";
    if(!this.loaded){
      this.loaded = true;
      for (let i = 0; i < surfSpots.length; i++) {
        let spot = surfSpots[i];
        //todo: use rAF wrapper;
        setTimeout(function(){
          this.addSpotMarker(spot)
        }.bind(this),i * 100);
      }
      if(hasPath){
        startSim(window._INITIAL_SETTINGS_.spot);
      }
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
  spot.addListener('click', function() {
    this.map.setZoom(6);
    browserHistory.push(loc.spot)
  }.bind(this));
  this.locations.push(spot);       
}

Map.prototype.changeLoc = function changeLoc(loc){
  //todo: clean this up
  let spot = this.locations.filter(function(item){
    return item.details && item.details.spot === loc;
  })
  if(spot.length){
    this.map.panTo(spot[0].getPosition());
  }
}

Map.prototype.addSingleBoundsListener = function addSingleListener(cb, param){
  let called = false;
  this.map.addListener('bounds_changed', function(){
    if(!called){
      called = true;
      cb(param)
    } else {
      google.maps.event.clearListeners(map, 'bounds_changed');
    }
  });
}


module.exports = Map;
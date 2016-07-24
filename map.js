import { browserHistory } from 'react-router'
var API_KEY = require('./config.js');
var styles = require('./styles/mapstyles.js');
// todo load this from separate data source
let surfSpots = require('./data/surfSpots');
//let surfSpots = [{spot: "ob",lat: 37.809, lng: -122.500}, {spot: "sc",lat: 36.950127, lng: -122.026017}, {spot: "bigsur",lat: 36.29649, lng: -121.889544}, {spot: "morro",lat: 35.371313, lng: -120.869593}, {spot: "rincon",lat: 34.372669, lng: -119.447469}, {spot: "la",lat: 34.000145, lng: -118.804716}]

module.exports = function map() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {"lat": 37.809, "lng": -122.500},
    disableDefaultUI: true,
    zoom: 6
  });
  map.loaded = false;
  map.setOptions({styles: styles});
  map.addListener('tilesloaded', function(){
    if(!map.loaded){
      map.loaded = true;
      for (let i = 0; i < surfSpots.length; i++) {
        let spot = surfSpots[i];
        setTimeout(function(){
          addSpotMarker(spot, map)
        },i * 100);
      }
    }

  });
}

function addSpotMarker(loc,map){
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
    map: map
  });
  spot.addListener('click', function() {
    map.setZoom(6);
    let loaded = false;
    map.panTo(spot.getPosition());
    map.addListener('bounds_changed', function(){
      console.log(loaded)
      if(!loaded){
        loaded = true;
        console.log(loc.spot)
        browserHistory.push(loc.spot)
      }
    })
  })       
}
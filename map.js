var API_KEY = require('./config.js');
var styles = require('./styles/mapstyles.js');
var startSim = require('./mainAnimation');
//todo: remove labels from map
module.exports = function map() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.290647, lng: -124.065839},
      disableDefaultUI: true,
      zoom: 6
    });

    map.setOptions({styles: styles});
    map.addListener('tilesloaded', startSim);

}
var locationRoutes = require('express').Router();
var locationData = require("../data/locations.json");

locationRoutes.get('/', function(req, res){
  var sortedData = locationData.locations.sort(function(a,b){
      return b.lat - a.lat
  })
  res.status(200).json({ locations:sortedData });
});


module.exports = locationRoutes;
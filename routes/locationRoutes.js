var locationRoutes = require('express').Router();
var locationData = require("../data/locations.json");

locationRoutes.get('/', function(req, res){
  var sortedData = locationData.locations.sort(function(a,b){
      return b.lat - a.lat
  })
  res.status(200).json({ locations:sortedData });
});

locationRoutes.get('/breaks/:id', function(req, res){
  var locationId = +req.params.id;
  var location = locationData.locations.filter(function(item){
    return item.code === locationId;
  })[0]
  if(location){
    res.status(200).json({breaks: location.breaks});
  }
})


module.exports = locationRoutes;
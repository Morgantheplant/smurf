var reportRoutes = require('express').Router();
var locationData = require('../data/locations.json');
var surfDataBuilder = require('../data/surfDataBuilder');
var request = require('request')
var dataBuilder = require('../dataBuilder');
var ob = require('../data/ob.json')
var cacheMap = {};



reportRoutes.get('/:id', function(req, res){
  // create add all codes if none exist
  if(!Object.keys(cacheMap).length){
    var locs = locationData.locations;
    locs.forEach(function(item){
      cacheMap[item.spot] = item.code;
    })
  }

  var code = cacheMap[req.params.id];
  //res.json(dataBuilder({ report: body}))
  request(`http://api.surfline.com/v1/forecasts/${code}`, function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.json({ report: dataBuilder(body) });
    }
  });
  
});

// var {
//       "bigsur": "bigsur",
//       "2960": "bigsur",
//     },
//     {
//       "name":"Ensenada",
//       "nbaja": "nbaja",
//       "2158": "nbaja"
//     },
//     {
//       "name":"Santa Barabara",
//       "sb": "sb",
//       "2141": "sb",
//     },
//     {
//       "name":"Santa Monica Pier",
//       "la": "la",
//       "2142": "la"
//     },
//     {
//       "name":"Morro Bay",
//       "slo": "slo",
//       "2962": "slo",
//     },
//     {
//       "name":"Ocean Beach",
//       "ob": "ob",
//       "4127": "ob"
//     },
//     {
//       "name":"Oceanside",
//       "nsd": "nsd",
//       "2143": "nsd",
//     },
//     {
//       "name":"Santa Cruz",
//       "2958": "sc",
//     },
//     {
//       "name":"South Orange County",
//       "2950": "soc"
//     }

module.exports = reportRoutes;
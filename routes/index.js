var express = require('express');
var routes = express.Router();
var locationRoutes = require('./locationRoutes');
var reportRoutes = require('./reportRoutes');
var config = require('../config.js');
// var request = require('request');


routes.get('/', function(req, res) {
  res.render('home', { "API_KEY": config.API_KEY });
});

routes.use('/locations', locationRoutes);
routes.use('/report', reportRoutes);

routes.get('/*', function(req, res) {
  res.render('home', { "API_KEY": config.API_KEY });
});


// app.get('/data/:spot', function(req, res){
//   var spot;
//   for (var i = 0; i < surfSpots.length; i++) {
//     var location = surfSpots[i];
//      if(location.spot === req.params.spot){
//       spot = location.spot;
//       break;
//     }
//   }
//   if(spot === "ob"){
//     app.getOceanBEachReport(res); 
//   } else if(spot){
//     res.sendFile(__dirname + '/data/' + spot + '.json');
//   }

// })

// app.getOceanBEachReport = function(res){
//   request("http://api.surfline.com/v1/forecasts/4233", function(error, response, body){
//     res.send(body);
//   });
// }

// app.get('/:spot', function(req, res) {
//   var spot;
//   for (var i = 0; i < surfSpots.length; i++) {
//     var location = surfSpots[i];
//     if(location.spot === req.params.spot){
//       spot = location.spot
//       center = { 
//         lat: +location.lat, 
//         lng: +location.lon 
//       };
//       break;
//     }
//   }
//   res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: JSON.stringify(center), spot: spot });
// });

module.exports = routes;
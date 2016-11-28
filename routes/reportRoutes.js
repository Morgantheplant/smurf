var reportRoutes = require('express').Router();
var locationData = require('../data/locations.json');
var request = require('request')
var dataBuilder = require('../dataBuilder');
var cacheMap = {};
var forecastCache = {};


reportRoutes.get('/:id', function(req, res){
  // create map of all codes if none exist
  if(!Object.keys(cacheMap).length){
    var locs = locationData.locations;
    locs.forEach(function(item){
      cacheMap[item.spot] = item.code;
    })
  }
  // lookup the code
  var code = cacheMap[req.params.id];
  if(code){
    getForecast(req, res, code)
  } else {
    // redirect to homepage if not found
    res.redirect('/');
  }
});

function getForecast(req, res, code){
  // get date for today
  var now = new Date();
  var dayDate = now.getDay() + now.getMonth() + now.getYear();
  // check if report has been stored for today
  if(forecastCache[code] && forecastCache[code].date === dayDate ){
     // send cached report
     res.json(forecastCache[code].forecast);
  } else {
    // request new report if last report was not from today
    request(`http://api.surfline.com/v1/forecasts/${code}`, function(error, response, body){
      if (!error && response.statusCode == 200) {
        var report = { report: dataBuilder(body) }
        // cache the result with current date
        forecastCache[code] = {
          forecast: report,
          date: dayDate 
        };
        // send report 
        res.json(report);
      }
    });

  } 
}


module.exports = reportRoutes;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8000;
var config = require('./config.js')
var exphbs = require('express-handlebars');
//var surfSpots = require('./data/surfSpots');
var surfData = require("./data");
var surfDataBuilder = require("./data/surfDataBuilder");
var surfSpots = surfDataBuilder(surfData);

app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');

var center = {"lat": 37.309, "lng": -122.400};


app.get('/', function(req, res) {
  res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: JSON.stringify(center), spot:"root"});
});

app.get('/bundle.js', function(req,res){
  res.sendFile(__dirname + '/public/bundle.js');
})
app.get('/styles.min.css', function(req, res){
   res.sendFile(__dirname + '/public/styles.min.css');
})
app.use(express.static(__dirname + '/public/images'));

app.get('/data/:spot', function(req, res){
  var spot;
  for (var i = 0; i < surfSpots.length; i++) {
    var location = surfSpots[i];
    if(location.spot === req.params.spot){
      spot = location.spot;
      break;
    }
  }
  if(spot){
    
    res.sendFile(__dirname + '/data/' + spot + '.json');
  }

})

app.get('*/favicon.ico', function(req, res) {
  res.sendFile(__dirname + '/favicon.ico');
})

app.get('/:spot', function(req, res) {
  var spot;
  for (var i = 0; i < surfSpots.length; i++) {
    var location = surfSpots[i];
    if(location.spot === req.params.spot){
      spot = location.spot
      center = { 
        lat: +location.lat, 
        lng: +location.lon 
      };
      break;
    }
  }
  res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: JSON.stringify(center), spot: spot });
});

http.listen(port, function(){
    console.log('Listening on port '+ port);
});



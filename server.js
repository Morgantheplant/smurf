var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8000;
var config = require('./config.js')
var exphbs = require('express-handlebars');
var surfSpots = require('./data/surfSpots');
app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');

var center = "34.290647,-124.065839";

app.get('/', function(req, res) {
  res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: center });
});

app.get('forecast/:spot', function(req, res) {
  //todo: add support for routes, right now /:spot gets static bundle and css assets
  for (var i = 0; i < surfSpots.length; i++) {
    var location = surfSpots[i];
    if(location.spot === req.params){
      center = [location.lat,location.lng].join(",")
    }
  }
  // cannot add lat long to url route.. possibly add to global
 // res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: center });
  res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: center });
});

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public/images'));


http.listen(port, function(){
    console.log('Listening on port '+ port);
});



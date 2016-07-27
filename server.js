var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8000;
var config = require('./config.js')
var exphbs = require('express-handlebars');
var surfSpots = require('./data/surfSpots');
app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');

var center = { lat: 34.290647, lng:-124.065839};

app.get('/', function(req, res) {
  res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: JSON.stringify(center), root: true });
});

app.get('/bundle.js', function(req,res){
  res.sendFile(__dirname + '/public/bundle.js');
})
app.get('/styles.min.css', function(req, res){
   res.sendFile(__dirname + '/public/styles.min.css');
})
app.use(express.static(__dirname + '/public/images'));

app.get('/:spot', function(req, res) {
  //todo: add support for routes, right now /:spot gets static bundle and css assets
  for (var i = 0; i < surfSpots.length; i++) {
    var location = surfSpots[i];
    if(location.spot === req.params){
      center = { 
        lat: location.lat, 
        lng: location.lng 
      };
      break;
    }
  }
  res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY, center: JSON.stringify(center), root: false });
});

http.listen(port, function(){
    console.log('Listening on port '+ port);
});



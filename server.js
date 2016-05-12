var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8000;
var config = require('./config.js')
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
  res.render(__dirname +'/public/index', { "API_KEY": config.API_KEY });
});

app.get('surf-report', function(req, res){
  
})

app.use(express.static(__dirname + '/public'));

http.listen(port, function(){
    console.log('Listening on port '+ port);
});
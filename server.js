var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));


http.listen(port, function(){
    console.log('Listening on port '+ port);
});
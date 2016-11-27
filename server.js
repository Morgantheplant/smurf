var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8000;
var exphbs = require('express-handlebars');
var routes = require('./routes');

app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use('/static', express.static('public'));
app.use('/', routes);

http.listen(port, function(){
    console.log('Listening on port '+ port);
});


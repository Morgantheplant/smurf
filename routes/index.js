var express = require('express');
var routes = express.Router();
var locationRoutes = require('./locationRoutes');
var reportRoutes = require('./reportRoutes');
var config = require('../config.js');


routes.get('/', function(req, res) {
  res.render('home', { "API_KEY": config.API_KEY });
});

routes.use('/locations', locationRoutes);
routes.use('/report', reportRoutes);

routes.get('/*', function(req, res) {
  res.render('home', { "API_KEY": config.API_KEY });
});


module.exports = routes;
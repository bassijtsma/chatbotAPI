var PORTNR = 3000;

var express = require('express');
var bodyParser = require('body-parser')
var app;
var routes = require('../routes/index.js')

var startServer = function(callback) {
  
  var app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({type: '*/*'}));

  routes(app);

  app.listen(PORTNR);
  console.log('listening on port 3000; http://bastronaut.com:3000/')

  if (callback) {
    return callback();
  }
};

module.exports = startServer;

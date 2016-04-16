var PORTNR = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app;
var routes = require('../routes/index.js');

var startServer = function(callback) {

  var app = express();

  app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
   res.setHeader('Content-Type', 'application/json');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   next();
  });

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json({type: '*/*'}));

  routes(app);

  app.listen(PORTNR);
  console.log('listening on port 3000; http://bastronaut.com:3000/')

  if (callback) {
    return callback();
  }
};

module.exports = startServer;

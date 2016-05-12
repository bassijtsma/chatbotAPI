var PORTNR = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var app;
var routes = require('../routes/index.js');

var startServer = function(callback) {

  var app = express();

  app.use(bodyParser.urlencoded({ extended: false }))
  // app.use(bodyParser.json())
  app.use(bodyParser.json({type: '*/*'}));

  app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, HEAD, OPTIONS');
   res.setHeader('Content-Type', 'application/json');
   res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
   next();
  });


  routes(app);

  app.listen(PORTNR);
  console.log('listening on port '+ PORTNR +' http://localhost:'+ PORTNR +' http://bastronaut.com:'+PORTNR)

  if (callback) {
    return callback();
  }
};

module.exports = startServer;

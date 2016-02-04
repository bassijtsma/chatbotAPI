var PORTNR = 3000;

var express = require('express');
var bodyParser = require('body-parser')
var app;

var startServer = function(callback) {
  var app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({type: '*/*'}));

  require('../routes/index.js')(app);

  app.listen(PORTNR);
  console.log('listening on port 3000; http://bastronaut.com:3000/')

  // called by async in app.js in case startServer fails
  if (callback) {
    return callback();
  }
};

module.exports = startServer;

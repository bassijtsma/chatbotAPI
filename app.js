var async = require('async');
var server = require('./initializers/server');
var database = require('./initializers/database');

// async.series([tasks], callback) runs functions in tasks array once the
// previous task has been completed. If any of the functions fail, callback is
// called with the error value and no other function runs.

async.series([
  function startDBConnection(callback) {
    console.log('setting up DB connection in app.js...')
    database.createDBConnection(function(database){
      callback(null, database);
    })
  },
  function startServer(callback) {
    console.log('app.js in stap 2')
    server(callback);
  },
  function yolo(callback) {
    console.log('app.js in stap 3')
  }], function(err) {
    // the callback function thats run after completion or on error
    if (err) {
      console.log('initialization failed', err);
    } else {
      console.log('finish setup db and server!');
    }
  }
)

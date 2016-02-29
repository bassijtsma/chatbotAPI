var async = require('async');
var server = require('./initializers/server');
var databaseInitializer = require('./initializers/database');

// async.series([tasks], callback) runs functions in tasks array once the
// previous task has been completed. If any of the functions fail, callback is
// called with the error value and no other function runs.



async.series([
  function getDBConnection(callback) {
  var dbConnection = databaseInitializer.getDBConnection();
  callback(null, dbConnection)
  },
  function startServer(callback) {
    console.log('nu hier')
    server(callback);
  },
  function yolo(callback) {
    console.log('nu weer hier')
  }], function(err) {
    // the callback function thats run after completion or on error
    if (err) {
      console.log('initialization failed', err);
    } else {
      console.log('finish setup db and server!');
    }
  }
)

var async = require('async');
var server = require('./initializers/server');
var database = require('./initializers/database');
// var database = new databaseInitializer();

// async.series([tasks], callback) runs functions in tasks array once the
// previous task has been completed. If any of the functions fail, callback is
// called with the error value and no other function runs.



async.series([
  function getDBConnection(callback) {
    console.log('getDBConnection vanuit app.js')
    database.getDBConnection(function(database){
      callback(null, database);
    })
    // console.log('calling the createDBConnection')
    // databaseInitializer.createDBConnection(function(dbConnection) {
    // console.log('app.js in stap 1')
    // callback(null, dbConnection);
  // });

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

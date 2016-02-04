var async = require('async');
var server = require('initializers/server');


// async.series([tasks], callback) runs functions in tasks array once the
// previous task has been completed. If any of the functions fail, callback is
// called with the error value and no other function runs.

async.series([
  function initializeDB(callback) {
    require('./initializers/database')(callback);
  },
  function startServer(callback) {
    server(callback);
  }], function(err) {
    // the callback function
    if (err) {
      console.log('initialization failed', err);
    } else {
      // never called without err, test this?
      console.log('initialize succeeded');
    }
  }
)

// db initialization singleton
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config = require('./config');

var mongodbPath = config.mongoPath;
// mongoose.connect(mongodbPath); TODO verplaatsen naar initialize

var dbConnection;

var initializeDB = (function(callback) {

  // TODO
  function createDBConnection() {
    var dbconnection = mongoClient.connect(mongodbPath, function(err, db){
      if (err) {
        console.log('unable to connect to db', err);
      } else {
        return dbconnection
      }
    })
  }

  return {
    getInstance : function () {
      if (!dbConnection) {
        dbConnection = createDBConnection();
      }
      return dbConnection;
    }
  }

  // callback in case of error
  if (callback) {
    console.log('calling callback from initializeDB')
    return callback();
  }
})(callback);

module.exports = initializeDB;

// db initialization singleton
var mongoClient = require('mongodb').MongoClient;
var mongoServer = require('mongodb').Server
var assert = require('assert');
var config = require('./config');

var mongodbPath = config.mongoPath;
var mongodbPort = config.mongoPort;
var dbName = config.dbName;

var dbConnection;

function createDBConnection() {
  dbConnection = mongoClient.connect(mongodbPath, function(err, db){
    console.log('hoi yep')
    return dbConnection
  })
};

var getDBConnection = function(callback) {
  console.log('initializing db')
  if (!dbConnection) {
    dbConnection = createDBConnection();
  }
  return dbConnection;
}

var closeDBConnection = function(callback) {
  dbConnection.close();
}


module.exports = {
  'getDBConnection' : getDBConnection,
  'closeDBConnection' : closeDBConnection
}

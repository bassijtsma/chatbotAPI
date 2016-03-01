// db initialization singleton
var mongoClient = require('mongodb').MongoClient;
var mongoServer = require('mongodb').Server
var assert = require('assert');
var config = require('./config');

var mongodbPath = config.mongoPath;
var mongodbPort = config.mongoPort;
var dbName = config.dbName;

var database = function() {};

database.createDBConnection = function(callback) {
  database.db = mongoClient.connect(mongodbPath, function(err, db){
    if (err) {
      console.log('error creating db connection: ', err)
    } else {
      console.log('dbconnection created');
      if (callback !== undefined) { callback(db)}
    }
  })
}

database.getDBConnection = function() {
  if (typeof(database.db) === 'undefined') {
    console.log('getting db connection')
    database.createDBConnection();
  }
  return database.db;
}

database.closeDBConnection = function() {
  if (database.db) {
    database.db.close();
  }
}


module.exports = database;

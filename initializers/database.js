// db initialization singleton
var mongoClient = require('mongodb').MongoClient;
var mongoServer = require('mongodb').Server
var assert = require('assert');
var config = require('./config');

var mongodbPath = config.mongoPath;
var mongodbPort = config.mongoPort;
var dbName = config.dbName;

var database = function () {};

database.createDBConnection = function(callback) {
  console.log('creating db!');
  database.db = mongoClient.connect(mongodbPath, function(err, db){
    if (err) {
      console.log('error creating db connection: ', err);
    } else {
      console.log('db connection created!');
      database.db = db;
      if (callback !== undefined) { callback(database)};
    }
  })
}

database.getDBConnection = function(callback) {
  if (typeof(database.db) === 'undefined') {
    console.log('undefined db connection, creating...');
    database.createDBConnection(callback);
  } else {
    console.log('db connection already exists, callback');
    return database.db;
  }
};

database.closeDBConnection = function() {
  if (database.db) { database.db.close(); }
};

module.exports = database;

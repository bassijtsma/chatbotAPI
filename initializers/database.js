// db initialization singleton
var mongoClient = require('mongodb').MongoClient;
var mongoServer = require('mongodb').Server
var assert = require('assert');
var config = require('./config');

var mongodbPath = config.mongoPath;
var mongodbPort = config.mongoPort;
var dbName = config.dbName;


var database = function () {};
module.exports = database;

database.createDBConnection = function(callback) {
  console.log('creating db!')
  database.db = mongoClient.connect(mongodbPath, function(err, db){
    if (err) {
      console.log('error creating db connection: ', err)
    } else {
      console.log('db connection created!')
      database.db = db;
      if (callback !== undefined) { callback(database)}
    }
  })
}

database.getDBConnection = function(callback) {
  if (typeof(database.db) === 'undefined') {
    console.log('undefined db connection, creating...')
    database.createDBConnection(callback);
  } else {
    console.log('db connection already exists, callback')
    return callback(database);
  }
}




/*
var database = function() {
  console.log("ITS GOING INTO THE DATABSAE!!")

  this.createDBConnection = function(callback) {
    console.log('creating db!')
    mongoClient.connect(mongodbPath, function(err, db){
      if (err) {
        console.log('error creating db connection: ', err)
      } else {
        console.log('db connection created!')
        this.db = db;
        if (callback !== undefined) { callback(database)}
      }
    })
  }

  this.getDBConnection = function(callback) {
    if (typeof(this.db) === 'undefined') {
      console.log('undefined db connection, creating...')
      this.createDBConnection(callback);
    } else {
      console.log('db connection already exists, callback')
      return callback(database);
    }
  }

  this.closeDBConnection = function() {
    if (this.db) {
      this.db.close();
    }
  }
}

module.exports = database;
*/

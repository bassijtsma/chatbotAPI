var database = require('../initializers/database');
var validator = require('validator');
var xssFilters = require('xss-filters');
var response = require('./response');

var message = function() {};

message.getMessages = function(callback) {
  var messageList = [];
  var cursor = database.db.collection('messages').find();

  cursor.each(function (err, doc) {
    if (doc !== null) {
      messageList.push(doc);
    } else {
      callback(null, messageList);
    }
  });
};

message.createMessage = function(requestBody, callback) {
  console.log('create msg from message model');
  callback(null, 'TODO');
  return;
};

message.deleteMessage = function(requestBody, callback) {
  console.log('delete msg from message model');
  callback(null, 'TODO');
  return;
};

message.updateMessage = function(requestBody, callback) {
  console.log('update msg from message model');
  callback(null, 'TODO');
  return;
};

module.exports = message;

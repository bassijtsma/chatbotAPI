var database = require('../initializers/database');
var validator = require('validator');
var xssFilters = require('xss-filters');

var conversation = function() {};

conversation.getConversations = function(callback) {
  var conversationList = [];
  var cursor = database.db.collection('conversations').find();

  cursor.each(function (err, doc) {
    if (doc !== null) {
      conversationList.push(doc);
    } else {
      callback(null, conversationList);
    }
  });
};

conversation.insertConversation = function(conversation, callback) {
  database.db.collection('conversations').insertOne({}, function(err, result) {
    if (err) {
      var errorstring = "error: "+ err;
      callback(errorstring, null);
    } else {
      callback(null, result);
    }
  });
};

// TODO: add upsert : true to update statement!
conversation.updateConversation = function(conversation, callback) {
  database.db.collection('conversations').updateOne({});
};

conversation.deleteConversation = function(conversation, callback) {
  database.db.collcetion('conversations').deleteOne({});
};

module.exports = conversation;

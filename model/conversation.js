var database = require('../initializers/database')

var conversation = function() {};

conversation.getConversations = function(callback) {
  var conversations = [];
  var cursor = database.db.collection('chatrule').find();

  cursor.each(function (err, doc) {
    if (doc != null) {
      // put chatrule in array
    } else {
      //  callback with return array
    }
  });
}

conversation.insertConversation = function(conversation, callback) {
  database.db.collection('conversations').insertOne({}, function(err, result) {
    if (err) {
      var errorstring = "error: "+ err;
      callback(errorstring, null);
    } else {
      callback(null, result);
    }
  });
}

// TODO: add upsert : true to update statement!
conversation.updateConversation = function(conversation, callback) {
  database.db.collection('conversations').updateOne({})

}

conversation.deleteConversation = function(conversation, callback) {
  database.db.collcetion('conversations').deleteOne({})
}

module.exports = conversation;

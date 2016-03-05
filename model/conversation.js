var database = require('../initializers/database')
// var database = new databaseInitializer();


var conversation = function() {

  var db = database.getDBConnection();
  
  this.getConversations = function(callback) {

    var conversations = [];
    var cursor = db.collection('chatrule').find();

    cursor.each(function (err, doc) {
      if (doc != null) {
        // put chatrule in array
      } else {
        //  callback with return array
      }
    });
  }

  this.insertConversation = function(conversation, callback) {
    db.collection('conversations').insertOne({}, function(err, result) {
      if (err) {
        var errorstring = "error: "+ err;
        callback(errorstring, null);
      } else {
        callback(null, result);
      }
    });
  }

  // TODO: add upsert : true to update statement!
  this.updateConversation = function(conversation, callback) {
    db.collection('conversations').updateOne({})

  }

  this.deleteConversation = function(conversation, callback) {
    db.collcetion('conversations').deleteOne({})
  }
}
module.exports = conversation;

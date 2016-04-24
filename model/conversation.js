var database = require('../initializers/database');
var validator = require('validator');
var xssFilters = require('xss-filters');
var message = require('../model/message');

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

conversation.insertConversation = function(requestBody, callback) {
  var conversationObject;

  if (isValidRequest(requestBody)) {
      conversationObject = buildConversationObject(requestBody);
      database.db.collection('conversations').insertOne(
        conversationObject, function (err, result) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, 'Conversation inserted successfully');
        }
      });
  } else {
    callback('Not a validRequest', null);
  }
};


conversation.updateConversation = function(requestBody, callback) {
  var conversationObject;

  if (isValidRequest(requestBody)) {
    conversationObject = buildConversationObject(requestBody);
    database.db.collection('conversations').updateOne({
      "conv_id" : conversationObject.conv_id
    }, {
      $set : { "conv_name" : conversationObject.conv_name}
    }, function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'Conversation updated successfully');
      }
    });
  } else {
      callback('Not a validRequest', null);
    }
};


conversation.deleteConversation = function(requestconv_id, callback) {

  if (isValidDeleteRequest(requestconv_id)) {
    conv_id = returnIntFromValue(requestconv_id);

    createDeleteConversationPromise(conv_id).then(function() {
      return message.deleteMessagesForConv_idPromise(conv_id);
    }, function(err) {
      callback(err, null);
    })
    .then(function(){
      callback(null, 'Deleted the conv_id and its messages');
    }, function(err) {
      console.log('Error deleting messages related to the conv id', err);
      callback(err, null);
    });
  } else {
    callback('Not a validRequest', null);
  }
};


function createDeleteConversationPromise(conv_id) {
  var deleteConversation = new Promise(function(resolve, reject) {
    database.db.collection('conversations').deleteOne({
      "conv_id" : conv_id,
    }, function(err, results) {
      if (err) {
        reject(err);
      } else {
        if (results.result.n > 0) {
          resolve('Conversation deleted successfully');
        } else {
          reject('No conversation was found to delete');
        }
      }
    });
  });
  return deleteConversation;
}


function isValidRequest(requestBody) {
  if (!isValidConv_id(requestBody.conv_id)) {
    console.log('conv_id not valid'); return false;}
  else if (!isValidConv_name(requestBody.conv_name)) {
    console.log('text not valid'); return false;}
  else { console.log('valid request!'); return true;}
}


function isValidDeleteRequest(conv_id) {
  if (!isValidConv_id(conv_id)) {
    console.log('conv_id not valid'); return false;}
  else { console.log('valid request!'); return true;}
}


function buildConversationObject(requestBody) {
  console.log('requestbody: ', requestBody);
  conversationObject = {};
  conversationObject.conv_name = validator.escape(requestBody.conv_name);
  if (typeof(requestBody.conv_id) === 'string') {
    conversationObject.conv_id = parseInt(validator.escape(requestBody.conv_id));
  } else {
    conversationObject.conv_id = requestBody.conv_id
  }
  return conversationObject;
}


function isValidConv_name(conv_name) {
  try {
    var escapedText = validator.escape(conv_name);
    return validator.isLength(escapedText, { min: 1, max : undefined});
  } catch (err) {
    console.log('error validating text:', conv_name);
    return false;
  }
}

function isValidConv_id(conv_id) {
  try {
    if (typeof(conv_id) === 'number') {
      return (conv_id > 0 && conv_id < 99999); // arbitrary for safety
    } else if (typeof(conv_id) === 'string') {
      var escapedConv_id = validator.escape(conv_id);
      return validator.isInt(escapedConv_id, { min: 0, max: 99999}); // arbitrary limit
    } else {
      console.log('conv_id not a string  or number: '+ conv_id);
    }
  } catch (err) {
    console.log('error validating conv_id:', conv_id, err);
    return false;
  }
}

function returnIntFromValue(value) {
  if (typeof(value) === 'string') {
    return parseInt(validator.escape(value));
  } else {
    return value;
  }
}


module.exports = conversation;

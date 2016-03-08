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

conversation.insertConversation = function(requestBody, callback) {
  var conversationObject;

  if (isValidRequest(requestBody)) {
      conversationObject = buildConversationObject(requestBody);
      database.db.collection('conversations').insertOne(conversationObject, function (err, result) {
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
      "conv_id" : questionObject.conv_id
    }, {
      $set : { "conv_name" : questionObject.conv_name}
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

conversation.deleteConversation = function(requestBody, callback) {
  var conversationObject;

  if (isValidRequest(requestBody)) {
    conversationObject = buildConversationObject(requestBody);
    database.db.collection('conversations').deleteOne({
      "conv_id" : questionObject.conv_id,
      "conv_name" : questionObject.conv_name
    }, function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        if (results.result.n > 0) {
          callback(null, 'Question deleted successfully');
        } else {
          callback('No document was found to delete');
        }
      }
    });
  } else {
      callback('Not a validRequest', null);
    }
};


function isValidRequest(requestBody) {
  if (!isValidConv_id(requestBody)) {
    console.log('q_nr not valid'); return false;}
  else if (!isValidConv_name(requestBody)) {
    console.log('text not valid'); return false;}
  else { console.log('valid request!'); return true;}
}


function buildConversationObject(requestBody) {
  console.log('requestbody: ', requestBody);
  conversationObject = {};
  questionDocument.conv_name = validator.escape(requestBody.conv_name);
  questionDocument.conv_id = parseInt(validator.escape(requestBody.conv_id));
  return conversationObject;
}

function isValidConv_name(requestBody) {
  try {
    var escapedText = validator.escape(requestBody.text);
    return validator.isLength(escapedText, { min: 1, max : undefined});
  } catch (err) {
    console.log('error validating text:', requestBody.text);
    return false;
  }
}

function isValidConv_id(requestBody) {
  try {
    var escapedConv_id = validator.escape(requestBody.conv_id);
    return validator.isInt(escapedConv_id, { min: 0, max: 99999}); // arbitrary limit
  } catch (err) {
    console.log('error validating conv_id:', requestBody.conv_id);
    return false;
  }
}


module.exports = conversation;

var database = require('../initializers/database');
var validator = require('validator');
var xssFilters = require('xss-filters');
var response = require('./response');
var question = require('./question');


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
  var messageObject;

  if (isValidCreateRequest(requestBody)) {
      messageObject = buildMessageObject(requestBody);
      database.db.collection('messages').insertOne(messageObject, function (err, result) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, 'Message inserted successfully');
        }
      });
  } else {
    callback('Not a validRequest', null);
  }
};

message.deleteMessage = function(requestBody, callback) {
  var messageObject;

  if (isValidDeleteRequest(requestBody)) {
    messageObject = buildMessageObject(requestBody);
    database.db.collection('messages').deleteOne({
      "m_nr" : messageObject.m_nr,
      "conv_id" : messageObject.conv_id,
    }, function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        if (results.result.n > 0) {
          callback(null, 'Message deleted successfully');
        } else {
          callback('No document was found to delete', null);
        }
      }
    });
  } else {
      callback('Not a validRequest', null);
    }
};

message.updateMessage = function(requestBody, callback) {
  var messageObject;

  if (isValidUpdateRequest(requestBody)) {
    messageObject = buildMessageObject(requestBody);
    database.db.collection('messages').updateOne({
      "m_nr" : messageObject.m_nr,
      "conv_id" : messageObject.conv_id
    }, {
      $set : {
        "qtext" : messageObject.qtext,
        "rtext" : messageObject.rtext,
        "is_alternative" : messageObject.is_alternative }
    }, function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        if (results.result.n > 0 ) {
            callback(null, 'Message updated successfully');
        } else {
          callback('No document was found to update', null);
        }
      }
    });
  } else {
      callback('Not a validRequest', null);
    }
};

function isValidCreateRequest(requestBody) {
  if (!isValidM_nr(requestBody.m_nr)) {
    console.log('m_nr not valid'); return false;}
  else if (!isValidText(requestBody.qtext)) {
    console.log('question text not valid'); return false;}
  else if (!isValidText(requestBody.rtext)) {
    console.log('response text not valid'); return false;}
  else if (!isValidConv_id(requestBody.conv_id)) {
    console.log('conv_id not valid'); return false;}
  else if (!isValidIs_Alternative(requestBody.is_alternative)) {
    console.log('is_alternative not valid'); return false;}
  else { console.log('valid request!'); return true;}
}


function isValidDeleteRequest(requestBody) {
  if (!isValidM_nr(requestBody.m_nr)) {
    console.log('m_nr not valid'); return false;}
  else if (!isValidConv_id(requestBody.conv_id)) {
    console.log('conv_id not valid'); return false;}
  else { console.log('valid request!'); return true;}
}


function isValidUpdateRequest(requestBody) {
  if (!isValidM_nr(requestBody.m_nr)) {
    console.log('m_nr not valid'); return false;}
  else if (!isValidText(requestBody.qtext)) {
    console.log('question text not valid'); return false;}
  else if (!isValidText(requestBody.rtext)) {
    console.log('response text not valid'); return false;}
  else if (!isValidConv_id(requestBody.conv_id)) {
    console.log('conv_id not valid'); return false;}
  else if (!isValidIs_Alternative(requestBody.is_alternative)) {
    console.log('is_alternative not valid'); return false;}
  else { console.log('valid request!'); return true;}
}

function isValidM_nr(m_nr) {
  try {
    var escapedM_nr = validator.escape(m_nr);
    return validator.isInt(escapedM_nr, { min: 0, max: 99999}); // arbitrary limit
  } catch (err) {
    console.log('error validating m_nr:', m_nr);
    return false;
  }
}

function isValidText(messageText) {
  try {
    var escapedText = validator.escape(messageText);
    return validator.isLength(escapedText, { min: 1, max : undefined});
  } catch (err) {
    console.log('error validating text:', messageText);
    return false;
  }
}

function isValidConv_id(conv_id) {
  try {
    var escapedConv_id = validator.escape(conv_id);
    return validator.isInt(escapedConv_id, { min: 0, max: 99999}); // arbitrary limit
  } catch (err) {
    console.log('error validating conv_id:', conv_id);
    return false;
  }
}

function isValidIs_Alternative(is_alternative) {
    try {
        return validator.isBoolean(is_alternative);
    } catch (err) {
      return false;
    }
}

function buildMessageObject(requestBody) {
  messageDocument = {};
  messageDocument.m_nr = parseInt(validator.escape(requestBody.m_nr));
  messageDocument.qtext = validator.escape(requestBody.qtext);
  messageDocument.rtext = validator.escape(requestBody.rtext);
  if (String(requestBody.is_alternative) == "true") {
    messageDocument.is_alternative = true;
  } else {
    messageDocument.is_alternative = false;
  }
  messageDocument.conv_id = parseInt(validator.escape(requestBody.conv_id));
  return messageDocument;
}


question.deleteMessagesForConv_idPromise = function(conv_id) {
  var deleteMessagesForConv_id = new Promise(function(resolve, reject){
    database.db.collection('messages').deleteMany(
      {"conv_id" : conv_id}, function (err, deleteResults) {
      if (err) {
        reject(err);
      } else {
        resolve(deleteResults);
      }
    });
  });
  return deleteMessagesForConv_id;
};

module.exports = message;

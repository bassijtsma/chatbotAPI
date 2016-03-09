var database = require('../initializers/database');
var validator = require('validator');
var xssFilters = require('xss-filters');
var question = require('../model/question');
var response = require('../model/response');

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

// TODO: works but hard to read. Maybe restructure without promises?
// could use async.waterfall()
conversation.deleteConversation = function(requestBody, callback) {
  var conversationObject;
  var deleteConversation;

  if (isValidRequest(requestBody)) {
    conversationObject = buildConversationObject(requestBody);
    deleteConversation = createDeleteConversationPromise(conversationObject);

    deleteConversation.then(function() {
      return question.createDeleteQuestionsForConv_idPromise(conversationObject.conv_id);
    }, function(err) {
      callback(err, null);
    })
    .then(function() {
      return response.createDeleteResponsesForConv_idPromise(conversationObject.conv_id);
    }, function(err) {
      console.log('Error deleting questions related to the conv id', err);
      callback(err, null);
    })
    .then(function(){
      callback(null, 'Deleted the conv_id and its related questions and responses');
    }, function(err) {
      console.log('Error deleting responses related to the conv id', err);
      callback(err, null);
    });
  } else {
    callback('Not a validRequest', null);
  }
};


function createDeleteConversationPromise(conversationObject) {
  var deleteConversation = new Promise(function(resolve, reject) {
    database.db.collection('conversations').deleteOne({
      "conv_id" : conversationObject.conv_id,
    }, function(err, results) {
      if (err) {
        reject(err);
      } else {
        if (results.result.n > 0) {
          resolve('Question deleted successfully');
        } else {
          reject('No document was found to delete');
        }
      }
    });
  });
  return deleteConversation;
}


// var questionDeletePromise = new Promise(function(resolve, reject) {
//   database.db.collection('conversations').deleteOne({
//     "conv_id" : conversationObject.conv_id,
//   }, function(err, results) {
//     if (err) {
//       callback(err, null);
//     } else {
//       if (results.result.n > 0) {
//         callback(null, 'Question deleted successfully');
//       } else {
//         callback('No document was found to delete');
//       }
//     }
//   });
//
// })


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
  conversationObject.conv_name = validator.escape(requestBody.conv_name);
  conversationObject.conv_id = parseInt(validator.escape(requestBody.conv_id));
  return conversationObject;
}

function isValidConv_name(requestBody) {
  try {
    var escapedText = validator.escape(requestBody.conv_name);
    return validator.isLength(escapedText, { min: 1, max : undefined});
  } catch (err) {
    console.log('error validating text:', requestBody.conv_name);
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

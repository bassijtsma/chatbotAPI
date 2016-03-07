var database = require('../initializers/database');
var validator = require('validator');
var xssFilters = require('xss-filters');

var response = function() {};

response.getResponses = function(callback) {
  var responseList = [];
  var cursor = database.db.collection('responses').find();

  cursor.each(function (err, doc) {
    if (doc !== null) {
      responseList.push(doc);
    } else {
      callback(null, responseList);
    }
  });
};

response.insertResponse = function(response, callback) {
  var responseObject;

  if (isValidRequest(requestBody)) {
      responseObject = buildResponseObject(requestBody);
      database.db.collection('responses').insertOne(responseObject, function (err, result) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, 'Response inserted successfully');
        }
      });
  } else {
    callback('Not a validRequest', null);
  }
};


response.updateResponse = function(response, callback) {
  var responseObject;

  if (!isValidRequest(requestBody), callback) {
    responseObject = buildResponseObject(requestBody);
    database.db.collection('responses').updateOne({
      "r_nr" : responseObject.r_nr,
      "conv_id" : responseObject.conv_id,
      "response_to_q" : responseObject.response_to_q
    }, {
      $set : { "text" : responseObject.text}
    }, function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'Response updated successfully');
      }
    });
  }
};

};

response.deleteResponse = function(response, callback) {
  var responseObject;

  if (!isValidRequest(requestBody), callback) {
    responseObject = buildResponseObject(requestBody);
    database.db.collection('responses').deleteOne({
      "r_nr" : questionObject.q_nr,
      "conv_id" : questionObject.conv_id,
      "text" : questionObject.text,
      "response_to_q" : questionObject.response_to_q
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
  }
  };

module.exports = response;

function isValidRequest(requestBody) {
  console.log('isvalidrequest...', requestBody);
  if (!isValidR_nr(requestBody)) {
    console.log('r_nr not valid'); return false;}
  else if (!isValidText(requestBody)) {
    console.log('text not valid'); return false;}
  else if (!isValidConv_id(requestBody)) {
    console.log('conv_id not valid'); return false;}
  else if (!isValidResponse_to_q(requestBody)) {
    console.log('response_to_q not valid'); return false;}
  else { console.log('valid request!'); return true;}
}


function buildResponseObject(requestBody) {
  console.log('requestbody: ', requestBody);
  responseDocument = {};
  responseDocument.text = validator.escape(requestBody.text);
  responseDocument.r_nr = parseInt(validator.escape(requestBody.r_nr));
  responseDocument.conv_id = parseInt(validator.escape(requestBody.conv_id));
  responseDocument.response_to_q = parseInt(validator.escape(requestBody.response_to_q));
  return responseDocument;
}


function isValidR_nr(requestBody) {
  try {
    var escapedR_nr = validator.escape(requestBody.r_nr);
    return validator.isInt(escapedR_nr, { min: 0, max: 99999}); // arbitrary limit
  } catch (err) {
    console.log('error validating r_nr:', requestBody.r_nr);
    return false;
  }
}


function isValidText(requestBody) {
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

function isValidResponse_to_q(requestBody) {
  try {
    var escapedResponse_to_q = validator.escape(requestBody.response_to_q);
    return validator.isInt(escapedResponse_to_q, { min: 0, max: 99999}); // arbitrary limit
  } catch (err) {
    console.log('error validating response_to_q:', requestBody.response_to_q);
    return false;
  }
}

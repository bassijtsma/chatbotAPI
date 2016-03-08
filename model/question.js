var database = require('../initializers/database');
var validator = require('validator');
var xssFilters = require('xss-filters');

var question = function() {};

question.getQuestions = function(callback) {
  var questionList = [];
  var cursor = database.db.collection('questions').find();

  cursor.each(function (err, doc) {
    if (doc !== null) {
      questionList.push(doc);
    } else {
      callback(null, questionList);
    }
  });
};


question.insertQuestion = function(requestBody, callback) {
  var questionObject;

  if (isValidRequest(requestBody)) {
      questionObject = buildQuestionObject(requestBody);
      database.db.collection('questions').insertOne(questionObject, function (err, result) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, 'Question inserted successfully');
        }
      });
  } else {
    callback('Not a validRequest', null);
  }
};


question.updateQuestion = function(requestBody, callback) {
  var questionObject;

  if (isValidRequest(requestBody)) {
    questionObject = buildQuestionObject(requestBody);
    database.db.collection('questions').updateOne({
      "q_nr" : questionObject.q_nr,
      "conv_id" : questionObject.conv_id
    }, {
      $set : { "text" : questionObject.text}
    }, function(err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, 'Question updated successfully');
      }
    });
  } else {
      callback('Not a validRequest', null);
    }
};


question.deleteQuestion = function(requestBody, callback) {
  var questionObject;

  if (isValidRequest(requestBody)) {
    questionObject = buildQuestionObject(requestBody);
    database.db.collection('questions').deleteOne({
      "q_nr" : questionObject.q_nr,
      "conv_id" : questionObject.conv_id,
      "text" : questionObject.text
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

question.createDeleteQuestionsForConv_idPromise = function(conv_id) {
  var deleteQuestionsForConv_id = new Promise(function(resolve, reject){
    database.db.collection('questions').deleteMany(
      {"conv_id" : conv_id}, function (err, deleteResults) {
      if (err) {
        reject(err);
      } else {
        resolve(deleteResults);
      }
    });
  });
  return deleteQuestionsForConv_id;
};


function isValidRequest(requestBody) {
  console.log('isvalidrequest...', requestBody);

  if (!isValidQ_nr(requestBody)) {
    console.log('q_nr not valid'); return false;}
  else if (!isValidText(requestBody)) {
    console.log('text not valid'); return false;}
  else if (!isValidConv_id(requestBody)) {
    console.log('conv_id not valid'); return false;}
  else { console.log('valid request!'); return true;}
}


function buildQuestionObject(requestBody) {
  console.log('requestbody: ', requestBody);
  questionDocument = {};
  questionDocument.text = validator.escape(requestBody.text);
  questionDocument.q_nr = parseInt(validator.escape(requestBody.q_nr));
  questionDocument.conv_id = parseInt(validator.escape(requestBody.conv_id));
  return questionDocument;
}

function isValidQ_nr(requestBody) {
  try {
    var escapedQ_nr = validator.escape(requestBody.q_nr);
    return validator.isInt(escapedQ_nr, { min: 0, max: 99999}); // arbitrary limit
  } catch (err) {
    console.log('error validating q_nr:', requestBody.q_nr);
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

module.exports = question;

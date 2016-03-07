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
  console.log('inserting record');
  var questionObject;
  if (isValidRequest(requestBody)) {
      questionObject = buildQuestionObject(requestBody);
      // insert into db
      // callback(null, 'gelukt');
  } else {
    callback('Not a validRequest', null);
  }

  /*
  database.db.collection('testy').insertOne({'yo' : 5}, function(err, result) {
    if (err) {
      var errormsg = "error: "+ err;
      callback(errormsg, null);
    } else {
      // TODO : verify what result looks like and what is being returned
      callback(null, result);
    }
  }); */

};

// TODO: add upsert : true to update statement!
question.updateQuestion = function(requestBody, callback) {
  database.db.collection('questions').updateOne({});

};

question.deleteQuestion = function(requestBody, callback) {
  database.db.collcetion('questions').deleteOne({});
};


module.exports = question;


function isValidRequest(requestBody) {
  console.log('isvalidrequest...', requestBody);
  if (!isValidR_nr(requestBody)) {
    console.log('r_nr not valid'); return false;}
  else if (!isValidText(requestBody)) {
    console.log('text not valid'); return false;}
  else if (!isValidConv_id(requestBody)) {
    console.log('conv_id not valid'); return false;}
  else { console.log('valid request!'); return true;}
}

function buildQuestionObject(requestBody) {
  console.log('building question object...');
  // questionDocument = {};
  // questionDocument.text = '';
  // questionDocument.q_nr = '';
  // questionDocument.conv_id = '';
}



function isValidR_nr(requestBody) {
  try {
    var escapedR_nr = validator.escape(requestBody.r_nr);
    console.log(escapedR_nr);
    return validator.isInt(escapedR_nr, { min: 0, max: 99});
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
    var escapedR_nr = validator.escape(requestBody.conv_id);
    return validator.isInt(escapedR_nr, { min: 0, max: 99});
  } catch (err) {
    console.log('error validating conv_id:', requestBody.conv_id);
    return false;
  }

}

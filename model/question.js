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
  console.log('isvalidrequest...', requestBody)
  try { validateR_nr(requestBody.r_nr); } catch (err) {
    console.log(err); return false; }
  try { validateText(requestBody.text); } catch (err) {
    console.log(err); return false; }
  try { validateText(requestBody.conv_id); } catch (err) {
    console.log(err); return false; }
}

function buildQuestionObject(requestBody) {
  console.log('building question object...');
  // questionDocument = {};
  // questionDocument.text = '';
  // questionDocument.q_nr = '';
  // questionDocument.conv_id = '';
}



function validateR_nr(r_nr) {
  var escapedR_nr = validator.escape(r_nr);
  return validator.isInt(escapedR_nr, { min: 0, max: undefined});
}

function validateText(text) {
  var escapedText = validator.escape(text);
  return validator.isLength(text, { min: 1, max : undefined});
}

function validateConv_id(conv_id) {
  var escapedR_nr = validator.escape(conv_id);
  return validator.isInt(conv_id, { min: 0, max: undefined});
}

function isValidQuestionRequest(requestBody) {
  console.log('\nstart validator:');
  console.log(validator.escape(requestBody.r_nr));
  console.log(validator.escape(requestBody.text));
  console.log(validator.escape(requestBody.conv_id));
  console.log(validator.escape('<""\nsS'));
  console.log(validator.isInt('05'));
  console.log(validator.isInt('-5'));
  console.log(validator.isInt(yo));
  validator.isInt('05');
}

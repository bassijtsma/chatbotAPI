var database = require('../initializers/database');

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

question.insertQuestion = function(question, callback) {
  console.log('inserting record');
  questionDocument = {};
  questionDocument.text = '';
  questionDocument.q_nr = '';
  questionDocument.conv_id = '';

  callback(null, 'gelukt')
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
question.updateQuestion = function(question, callback) {
  database.db.collection('questions').updateOne({});

};

question.deleteQuestion = function(question, callback) {
  database.db.collcetion('questions').deleteOne({});
};


module.exports = question;

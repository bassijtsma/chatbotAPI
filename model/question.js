var database = require('../initializers/database')
// var database = new databaseInitializer();
// var db = database.getDBConnection();


var question = function() {
  // var db = database.getDBConnection();
  // if (!question.db) {
  //   console.log('initializing from question model');
  //   databaseInitializer.getDBConnection(function(database) {
  //     question.db = database;
  //   });
  // }

  var db = database.getDBConnection();

  this.getQuestions = function(callback) {
    // TODO: error handling
    var questions = [];
    var cursor = db.collection('questions').find();

    cursor.each(function (err, doc) {
      if (doc != null) {
        questions.append(doc);
      } else {
        callback(null, questions);
      }
    });
  }

  this.insertQuestion = function(question, callback) {
    console.log('inserting record')
    questionDocument = {};
    questionDocument.text = '';
    questionDocument.q_nr = '';
    questionDocument.conv_id = '';
    // console.log(database);
    db.collection('testy').insertOne({'yo' : 5}, function(err, result) {
      if (err) {
        var errormsg = "error: "+ err;
        callback(errormsg, null);
      } else {
        // TODO : verify what result looks like and what is being returned
        callback(null, result);
      }
    });
  }

  // TODO: add upsert : true to update statement!
  this.updateQuestion = function(question, callback) {
    db.collection('questions').updateOne({})

  }

  this.deleteQuestion = function(question, callback) {
    db.collcetion('questions').deleteOne({})
  }
}

module.exports = question;

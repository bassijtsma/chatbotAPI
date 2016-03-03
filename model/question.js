// var databaseInitializer = require('../initializers/database')

var databaseInitializer;
var question = function() {

  // if (!question.db) {
  //   console.log('initializing from question model');
  //   databaseInitializer.getDBConnection(function(database) {
  //     question.db = database;
  //   });
  // }

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
    database.collection('testy').insertOne({'yo' : 5});
    // TODO how to do error handling?
    callback();

  }

  // TODO: add upsert : true to update statement!
  this.updateQuestion = function(question, db, callback) {
    db.collection('questions').updateOne({})

  }

  this.deleteQuestion = function(question, db, callback) {
    db.collcetion('questions').deleteOne({})
  }
}

module.exports = question;

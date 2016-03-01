var databaseInitializer = require('../initializers/database')

var question = function() {

  if (!question.db) {
    console.log('initializing from question model');
    databaseInitializer.getDBConnection(function(database) {
      question.db = database;
    });
  }

  this.getQuestions = function(callback) {
    var questions = [];
    var cursor = db.collection('questions').find();

    cursor.each(function (err, doc) {
      if (doc != null) {
        // put question in array
      } else {
        //  callback with return array
      }
    });
  }

  this.insertQuestion = function(question, callback) {
    console.log('inserting record')
    // console.log(database);
    database.collection('testy').insertOne({'yo' : 5});

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

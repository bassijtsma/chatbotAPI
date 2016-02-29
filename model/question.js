
function getQuestions(db, callback) {
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


function insertQuestion(question, db, callback) {
  db.collection('questions').insertOne({});

}

// TODO: add upsert : true to update statement!
function updateQuestion(question, db, callback) {
  db.collection('questions').updateOne({})

}

function deleteQuestion(question, db, callback) {
  db.collcetion('questions').deleteOne({})
}

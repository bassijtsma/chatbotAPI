var mongoose = require('mongoose');
var mongodbPath = 'mongodb://localhost/chatbot'

mongoose.connect(mongodbPath);

/*
var Schema = mongoose.Schema;
var chatruleSchema = new Schema({
  id : Number,
  key : String,
  response : String
});

var chatrule = mongoose.model('chatrule', Schema);
*/



function getChatrules(db, callback) {
  var chatrules = [];
  var cursor = db.collection('chatrule').find();

  cursor.each(function (err, doc) {
    if (doc != null) {
      // put chatrule in array
    } else {
      //  callback with return array
    }
  });
}


function insertChatrule(chatrule, db, callback) {
  db.collection('chatrules').insertOne({});

}

// TODO: add upsert : true to update statement!
function updateChatrule(chatrule, db, callback) {
  db.collection('chatrules').updateOne({})

}

function deleteChatrule(chatrule, db, callback) {
  db.collcetion('chatrules').deleteOne({})
}

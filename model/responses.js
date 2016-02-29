
function getResponses(db, callback) {
  var chatrules = [];
  var cursor = db.collection('responses').find();

  cursor.each(function (err, doc) {
    if (doc != null) {
      // put response in array
    } else {
      //  callback with return array
    }
  });
}


function insertResponse(response, db, callback) {
  db.collection('responses').insertOne({});

}

// TODO: add upsert : true to update statement!
function updateResponse(response, db, callback) {
  db.collection('responses').updateOne({})

}

function deleteResponse(response, db, callback) {
  db.collcetion('responses').deleteOne({})
}

function getResponses(callback) {
  var responses = [];
  var cursor = db.collection('responses').find();

  cursor.each(function (err, doc) {
    if (doc != null) {
      // TODO: verify format of documents. probably filter out object ID
      responses.append(doc);
      // put response in array
    } else {
      callback(null, responses);
      //  callback with return array
    }
  });
}


function insertResponse(response, callback) {
  responseDocument = {};
  responseDocument.text = '';
  responseDocument.r_nr = '';
  responseDocument.conv_id = '';
  responseDocument.response_to_q = '';
  // db.collection('responses').insertOne({responseDocument});
  console.log('insertOne responseDocument', responseDocument);
  callback(null, 'result ok');
}

// TODO: add upsert : true to update statement!
function updateResponse(response, db, callback) {
  db.collection('responses').updateOne({});

}

function deleteResponse(response, db, callback) {
  // fetch documentt, use the objectID to remove it
  deleteResponse = {};
  db.collection('responses').findOne();
  db.collcetion('responses').deleteOne({});
}

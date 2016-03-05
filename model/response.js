var database = require('../initializers/database')
// var database = new databaseInitializer();


var response = function() {

  var db = database.getDBConnection();
  
  function getResponses(callback) {
    // if (typeof(db) === 'undefined') {
    //   db = database.getDBConnection();
    // }



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
    db.collection('responses').insertOne({responseDocument}, function(err, result){
      if (err) {
        var errormsg = "error: "+ err;
        callback(errormsg, null);
      } else {
        // TODO : verify what result looks like and what is being returned
        callback(null, result);
      }
    });
    console.log('insertOne responseDocument', responseDocument);
  }

  // TODO: add upsert : true to update statement!
  function updateResponse(response, callback) {
    db.collection('responses').updateOne({});

  }

  function deleteResponse(response, callback) {
    // fetch documentt, use the objectID to remove it
    deleteResponse = {};
    db.collection('responses').findOne();
    db.collection('responses').deleteOne({});
  }
}
module.exports = response;

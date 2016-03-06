var database = require('../initializers/database');

var response = function() {};

response.getResponses = function(callback) {
  var responseList = [];
  var cursor = database.db.collection('responses').find();

  cursor.each(function (err, doc) {
    if (doc !== null) {
      // TODO: verify format of documents. probably filter out object ID
      responseList.push(doc);
      // put response in array
    } else {
      callback(null, responseList);
      //  callback with return array
    }
  });
};

response.insertResponse = function(response, callback) {
  responseDocument = {};
  responseDocument.text = '';
  responseDocument.r_nr = '';
  responseDocument.conv_id = '';
  responseDocument.response_to_q = '';
  database.db.collection('responses').insertOne({responseDocument}, function(err, result){
    if (err) {
      var errormsg = "error: "+ err;
      callback(errormsg, null);
    } else {
      // TODO : verify what result looks like and what is being returned
      callback(null, result);
    }
  });
  console.log('insertOne responseDocument', responseDocument);
};

// TODO: add upsert : true to update statement!
response.updateResponse = function(response, callback) {
  database.db.collection('responses').updateOne({});

};

response.deleteResponse = function(response, callback) {
  // fetch documentt, use the objectID to remove it
  deleteResponse = {};
  database.db.collection('responses').findOne();
  database.db.collection('responses').deleteOne({});
};

module.exports = response;

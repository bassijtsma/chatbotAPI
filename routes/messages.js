var message = require('../model/message');

module.exports = function(router) {
  router.route('/')
  // handle HTTP calls for /messages/
  .get(function(req, res, next) {
    console.log(' getting..');
    message.getMessages(function(err, questions) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : questions});
      }
    });
  })
  .post(function(req, res, next) {
    message.createMessage(req.body, function(err, createResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : createResult});
      }
    });
  })

  router.route('/:conv_id/:key')
  .delete(function(req, res, next) {
    requestBody = {'conv_id' : req.params.conv_id, 'key' : req.params.key}
    message.deleteMessage(requestBody, function(err, deleteResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : deleteResult});
      }
    });
  })
  .put(function(req, res, next) {
    message.updateMessage(req.body, function(err, updateResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : updateResult});
      }
    });
  });
};

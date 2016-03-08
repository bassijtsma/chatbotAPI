// handles all /conversations calls
var conversation = require('../model/conversation');

module.exports = function(router) {
  router.route('/:conv_nr')
  // handle HTTP calls for /conversations/:conv_nr
  .put(function(req, res, next) {
    conversation.updateConversation(req.body, function(err, updateResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : updateResult});
      }
    });
  })
  .delete(function (req, res, next) {
    conversation.deleteConversation(req.body, function(err, deleteResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : deleteResult});
      }
    });
  });

  router.route('/')
  // handle HTTP calls for /conversations/
  .get(function(req, res, next) {
    conversation.getConversations(function(err, conversations) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : conversations});
      }
    });
  })
  .post(function(req, res, next) {
    conversation.insertConversation(function(err, insertResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : insertResult});
      }
    });
  });
};

var conversationmodel = require('../model/conversation')
var conversation = new conversationmodel();

// handles all /conversations calls

module.exports = function(router) {
  router.route('/:q_nr')
  // handle HTTP calls for /conversations/:q_nr
  .get(function(req, res, next) {
    // return conversation
  })
  .put(function(req, res, next) {
    // update conversation
  })
  .delete(function (req, res, next) {
    // delete a conversation
  });

  router.route('/')
  // handle HTTP calls for /conversations/
  .get(function(req, res, next) {
    conversation.getcCnversations(function(err, conversations) {
      if (err) {
        res.send({'results' : 'error'})
      } else {
          res.send({'results' : conversations})
      }
    })
  })
  .post(function(req, res, next) {
    console.log(req);
    conversation.insertConversation(function(insertResult) {
      res.send({'results' : insertResult})
    }
  )}
)}

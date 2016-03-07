// handles all /questions calls
var question = require('../model/question');

module.exports = function(router) {
  router.route('/:conv_id/:q_nr')
  // handle HTTP calls for /questions/:
  .put(function(req, res, next) {
    question.updateQuestion(req.body, function(err, updateResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : updateResult});
      }
    });
  })
  .delete(function (req, res, next) {
    question.deleteQuestion(req.body, function(err, deleteResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : deleteResult});
      }
    });
  });

  router.route('/')
  // handle HTTP calls for /questions/
  .get(function(req, res, next) {
    question.getQuestions(function(err, questions) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : questions});
      }
    });
  })
  .post(function(req, res, next) {
    question.insertQuestion(req.body, function(err, insertResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : insertResult});
      }
    });
  });
};

var questionmodel = require('../model/question')
var question = new questionmodel();

// handles all /questions calls

module.exports = function(router) {
  router.route('/:q_nr')
  // handle HTTP calls for /questions/:q_nr
  .get(function(req, res, next) {
    // return question
  })
  .put(function(req, res, next) {
    // update question
  })
  .delete(function (req, res, next) {
    // delete a question
  });

  router.route('/')
  // handle HTTP calls for /questions/
  .get(function(req, res, next) {
    question.getQuestions(function(err, questions) {
      if (err) {
        res.send('results' : 'error')
      } else {
          res.send({'results' : questions})
      }
    })
  })
  .post(function(req, res, next) {
    console.log(req);
    question.insertQuestion(function(insertResult) {
      res.send({'results' : insertResult})
    }
  })
}

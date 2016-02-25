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
  })




}

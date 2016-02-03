// handles all /chatrules calls

module.exports = function(router) {
  router.route('/:ruleId')
  // handle HTTP calls for /chatrules/:ruleId
  .get(function(req, res, next) {
    // return chatrule
  })
  .put(function(req, res, next) {
    // update chatrule
  })
  .delete(function (req, res, next) {
    // delete a chatrule
  });

  router.route('/')
  // handle HTTP calls for /chatrules/
  .get(function(req, res, next) {
  })




}

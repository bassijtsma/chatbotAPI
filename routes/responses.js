// handles all /responses calls

module.exports = function(router) {
  router.route('/:r_nr')
  // handle HTTP calls for /responses/:r_nr
  .get(function(req, res, next) {
    // return response
  })
  .put(function(req, res, next) {
    // update response
  })
  .delete(function (req, res, next) {
    // delete a response
  });

  router.route('/')
  // handle HTTP calls for /responses/
  .get(function(req, res, next) {
    
  })




}

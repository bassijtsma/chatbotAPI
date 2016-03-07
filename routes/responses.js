// handles all /responses calls
var response = require('../model/response');

module.exports = function(router) {
  router.route('/:conv_id/:r_nr')
  // handle HTTP calls for /responses/:r_nr
  .put(function(req, res, next) {
    response.updateResponse(req.body, function(err, updateResult) {
      if (err) {
        res.send({'results' : 'error', error : err});
      } else {
        res.send({'results' : updateResult});
      }
    });
  })
  .delete(function (req, res, next) {
    // delete a response
    response.deleteResponse(req.body, function(err, deleteResult) {
      if (err) {
        res.send({'results' : 'error', error : err});
      } else {
        res.send({'results' : deleteResult});
      }
    });
  });

  router.route('/')
  // handle HTTP calls for /responses/
  .get(function(req, res, next) {
    response.getResponses(function(err, questions) {
      if (err) {
        res.send({'results' : 'error', error : err});
      } else {
          res.send({'results' : questions});
      }
    });
  })
  .post(function(req, res, next) {
    response.insertResponse('reqparams', function(err, insertResult) {
      if (err) {
        res.send({'results' : 'error', 'error' : err});
      } else {
        res.send({'results' : insertResult});
      }
    });
  });
};

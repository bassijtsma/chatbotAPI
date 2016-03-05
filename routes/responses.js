// handles all /responses calls

var responsenmodel = require('../model/response')
// var response = new responsenmodel();



module.exports = function(router) {
  router.route('/:r_nr')
  // handle HTTP calls for /responses/:r_nr
  .get(function(req, res, next) {
    // return response
  })
  .put(function(req, res, next) {
    response.updateResponse('reqparams', function(err, updateResult) {
      if (err) {
        res.send({'results' : 'error'});
      } else {
        res.send({'results' : updateResult});
      }
    })
  })
  .delete(function (req, res, next) {
    // delete a response
    response.deleteResponse('reqparams', function(err, deleteResult) {
      if (err) {
        res.send({'results' : 'error'});
      } else {
        res.send({'results' : error});
      }
    })
  });

  router.route('/')
  // handle HTTP calls for /responses/
  .get(function(req, res, next) {
    response.getResponses(function(err, questions) {
      if (err) {
        res.send({'results' : 'error'})
      } else {
          res.send({'results' : questions})
      }
    })
  })
  .post(function(req, res, next) {
    //TODO get reqparams to post
    console.log(req.body);
    response.insertResponse('reqparams', function(err, insertResult) {
      res.send({'results' : insertResult});
    })
  })
}

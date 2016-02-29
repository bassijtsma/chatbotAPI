var express = require('express');
var routes = require('require-dir');


module.exports = function(app) {
  // require-dir reads the folder and require() all js and json files inside.
  // calling require-dir without arguments will call from current dir
  Object.keys(routes).forEach(function(routeName) {
    console.log(routeName)
    var router = express.Router();
    // initialize all routes with router arg to add functionality to the router.
    require('./' + routeName)(router)
    // Add router to the corresponding  route
    app.use('/' + routeName, router)
  })
}

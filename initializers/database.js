// db initialization singleton

var dbConnection;

var initializeDB = (function(callback) {

  // TODO
  function createDBConnection() {
    var dbconnection = 'placeholder';
    return dbconnection;
  }

  return {
    getInstance : function () {
      if (!dbConnection) {
        dbConnection = createDBConnection();
      }
      return dbConnection;
    }
  }

  // callback in case of error
  if (callback) {
    console.log('calling callback from initializeDB')
    return callback();
  }
})();

module.exports = initializeDB;

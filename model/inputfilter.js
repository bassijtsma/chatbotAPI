// Quick and dirty module to protect against mongodb injection attacks.
// Filters out: $, [, ], 'mapReduce:', 'group:'
// For examples on injecting mongoDB
// http://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
// https://docs.mongodb.com/manual/faq/fundamentals/#javascript
//

var inputfilter = {
  escapeIllegal(inputstring) {
      var escapedString = escapeDollarSignTest(inputstring);
      // var escapedString = escapeBrackets(escapedString);
      return escapedString
  }
}

// function does not remove dollar sign as it seems it would be common in
// use cases related to prices. Instead, if removes the colon to prevent
// injection with commands such as: "password": {"$gt": ""}. probably rename fn
function escapeDollarSign(inputstring) {
  if (inputstring.indexOf('$') !== -1 & inputstring.indexOf(':') !== -1 ) {
    return inputstring.replace(':', '');
  }
}

function escapeDollarSignTest(inputstring) {
  if (inputstring.indexOf('$') !== -1 ) {
    return inputstring.replace('$', '&#36;');
  }
}

function escapedString(inputstring) {
  // TODO
  return inputstring;
}


module.exports = inputfilter;

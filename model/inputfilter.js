// Quick and dirty module to protect against mongodb injection attacks,
// and feeble attempt at prevent xss.
// Filters out: $, [, <, ... etc and rewrites to html codes
// For examples on injecting mongoDB
// http://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
// https://docs.mongodb.com/manual/faq/fundamentals/#javascript
//

var inputfilter = {
  escapeIllegal(inputstring) {
      var escapedString = escapeTextPattern(inputstring, '$', '&#36;');
      escapedString = escapeTextPattern(escapedString, '<', '&#60');
      escapedString = escapeTextPattern(escapedString, '>', '&#62;');
      escapedString = escapeTextPattern(escapedString, '\'', '&#39;');
      escapedString = escapeTextPattern(escapedString, '\"', '&#34;');
      escapedString = escapeTextPattern(escapedString, '\\', '&#92;');
      escapedString = escapeTextPattern(escapedString, '\/', '&#47;');
      escapedString = escapeTextPattern(escapedString, '[', '&#91;');
      escapedString = escapeTextPattern(escapedString, ':', '&#58;');
      return escapedString;
  }
};



function escapeTextPattern(input, pattern, replacewith) {
  var escapedString = input;
  while (escapedString.indexOf(pattern) !== -1) {
    escapedString = escapedString.replace(pattern, replacewith);
  }
  return escapedString;
}


module.exports = inputfilter;

// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

// This is heavily inspired by reading Douglas Crockford's JSON parser
// found in his book JavaScript: The Good Parts or at
// http://oreilly.com/javascript/excerpts/javascript-good-parts/json.html

// I mostly just did it to annotate a bit and see how much I could remember
var parseJSON = function (json) {
  var ch; // current character
  var at; // index of current character

  // function for grabbing the next character
  // if given a character, checks to make sure that that
  // is indeed the current character
  var next = function(c) {
    if (c && c !== ch) {
      throw 'Expected ' + c + ' but encountered ' + ch;
    }

    ch = json.charAt(at);
    at++;
    return ch;
  };

  // function for parsing a numeric value
  var number = function() {
    var numstr = '';

    // deal with negative numbers
    if (ch == '-') {
      numstr += ch;
      next('-');
    }
    // grab all digits
    while (ch >= '0' && ch <= '9') {
      numstr += ch;
      next();
    }
    // check if there is a decimal point, and if so, grab
    // the digits beyond it
    if (ch == '.') {
      numstr += ch;
      next();
      while (ch >= '0' && ch <= '9') {
        numstr += ch;
        next();
      }
    }

    // convert numeric string to a number
    var num = +numstr;

    // check that it was a valid result
    if (isNaN(num)) {
      throw 'Invalid number encountered';
    } else {
      return num;
    }
  };


  // parses the next value in the json string
  var value = function() {
    if (ch === '-' || (ch >= '0' && ch <= '9')) {
      return number();
    }
  };


  // parse the input json string
  at = 0;
  next();
  return value();
};

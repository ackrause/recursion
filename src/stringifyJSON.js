// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var json = '';

  // Determine type of obj
  var determineType = function(obj) {
    var type = typeof(obj);

    if (type === 'object') { // requires further inquiry
      if (obj === null) {
        type = 'null';
      } else {
        type = 'object';
      }
    }

    return type;
  };
  var type = determineType(obj);

  // Stringifying functions by obj type
  var stringifyNumber = function(val) {
    return isNaN(val) ? 'null' : String(val);
  };
  var stringifyNull = function() {
    return 'null';
  };
  var stringifyBoolean = function(val) {
    return val.toString();
  };
  var stringifyString = function(val) {
    return '"' + val + '"';
  };

  // This is better than a switch statement??
  var stringify = {
    'number': stringifyNumber,
    'null': stringifyNull,
    'boolean': stringifyBoolean,
    'string': stringifyString
  };

  if (typeof(stringify[type]) === 'function') {
    json = stringify[type](obj);
  } else {
    json = '';
  }

  return json;
};

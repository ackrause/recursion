// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // Determine type of obj
  var determineType = function(obj) {
    var type = typeof(obj);

    if (type === 'object') { // requires further inquiry
      if (obj === null) {
        type = 'null';
      } else if (Array.isArray(obj)) {
        type = 'array';
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
  var stringifyArray = function(arr) {
    var contents = '';

    for (var i = 0; i < arr.length; i++) {
      contents += stringifyJSON(arr[i]);
      if (i !== arr.length -1) {
        contents += ',';
      }
    }

    return '[' + contents + ']';
  };
  var stringifyObject = function(obj) {
    var contents = '';

    for (var key in obj) {
      contents += '"' + key + '":' + stringifyJSON(obj[key]) + ',';
    }

    // Hacky way of removing final comma
    if (contents.length >= 1) {
      contents = contents.slice(0, contents.length-1);
    }

    return '{' + contents + '}';
  };

  // This is better than a switch statement??
  var stringify = {
    'number': stringifyNumber,
    'null': stringifyNull,
    'boolean': stringifyBoolean,
    'string': stringifyString,
    'array': stringifyArray,
    'object': stringifyObject
  };
  var json;
  if (typeof(stringify[type]) === 'function') {
    json = stringify[type](obj);
  } else {
    json = undefined;
  }

  return json;
};

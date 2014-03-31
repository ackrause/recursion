// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var type = typeof(obj);
  var json = '';

  // Stringifying functions by obj type
  var number = function(val) {
    return isNaN(val) ? 'null' : String(val);
  };

  // This is better than a switch statement??
  var stringify = {
    'number': number
  };

  if (typeof(stringify[type]) === 'function') {
    json = stringify[type](obj);
  } else {
    json = '';
  }

  return json;
};

// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  function stringifyArray(array) {
    var stringedArr = '[';
	if(array.length > 0) {
	  for(var index = 0; index < array.length; index++) {
	    stringedArr += stringifyJSON(array[index]) + ',';
	  }
	  stringedArr = stringedArr.substring(0, stringedArr.length - 1);
    }
	stringedArr += ']';
	return stringedArr;
  }
  
  function stringifyObject(obj) {
    var stringedObj = '{';
	for(var item in obj) {
	  var value = stringifyJSON(obj[item]);
	  if(value) {
	     stringedObj += '"' + item + '":' + value + ',';
	  }
	}
	return stringedObj == '{' ? stringedObj + '}' : stringedObj.substring(0, stringedObj.length - 1) + '}';
  }
  
  if(typeof obj === 'function' || typeof obj === 'undefined') {
   return null;
  }
  
  if(obj == null) {
    return 'null';
  }
  
  return obj.length !== undefined? (Array.isArray(obj) ? stringifyArray(obj) : '"' + obj.toString() + '"') : typeof obj === 'object' ? stringifyObject(obj) : obj.toString();
};
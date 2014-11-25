// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  if(this === window) {
	var html = window.document.children[0];
	for(var index = 1; index < window.document.children.length; index++) {
	  if(html.nodeType === 1 && html.nodeName === 'HTML' && typeof html.className !== 'undefined') {
		break;
	  }
	  html = html.nextElementSibling;
	}
	
	html = html.children[0];
	for(var index = 1; index < html.children.length; index++) {
	  if(html.nodeType === 1 && html.nodeName === 'BODY' && typeof html.className !== 'undefined') {
		break;
	  }
	  html = html.nextElementSibling;
	}
	
    return getElementsByClassName.call(html, className);
  }
  
  var elements = [];
  
  for(var objClass in this.classList) {
    if(this.nodeName === 'BODY') console.log("body class:" + objClass + "|"  + this.classList[objClass]);
    if(new RegExp(" " + className + " ").test(this.classList[objClass])) {
	  console.log("thisPush:" + this.nodeName + "|" + this.classList[objClass]);
	  elements.push(this);
	  break;
	}
  }
  
  for(var child in this.children) {
	var result = getElementsByClassName.call(this.children[child], className);
	for(var elem = 0; elem < result.length; elem++) {
	  elements.push(result[elem]);
	}
  }
  return elements;
};

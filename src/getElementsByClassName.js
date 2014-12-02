// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var index;
  if(this === window) {
	var html = window.document.children[0];
	for(index = 1; index < window.document.children.length; index++) {
	  if(html.nodeType === 1 && html.nodeName === 'HTML' && typeof html.className !== 'undefined') {
		break;
	  }
	  html = html.nextElementSibling;
	}
	
	html = html.children[0];
	for(index = 1; index < html.children.length; index++) {
	  if(html.nodeType === 1 && html.nodeName === 'BODY' && typeof html.className !== 'undefined') {
		break;
	  }
	  html = html.nextElementSibling;
	}
	
    return getElementsByClassName.call(html, className);
  }
  
  var elements = [];
  
  for(index = 0; index < this.classList.length; index++) {
    if(this.classList[index] === className) {
	  elements.push(this);
	  break;
	}
  }
  
  for(index = 0; index < this.children.length; index++) {
	var result = getElementsByClassName.call(this.children[index], className);
	for(var elem = 0; elem < result.length; elem++) {
	  elements.push(result[elem]);
	}
  }
  return elements;
};

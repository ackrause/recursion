// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  var foundNodes = [];

  var findClassInDOM = function(node) {
    // Check currnet node
    if (node.classList && node.classList.contains(className)) {
      foundNodes.push(node);
    }

    // Check child nodes
    for (var i = 0; i < node.childNodes.length; i++) {
      findClassInDOM(node.childNodes[i]);
    }
  };

  findClassInDOM(document.body);

  return foundNodes;
};

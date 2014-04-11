(function () {

  var QueryWrapper = function (elems) {
    // TODO
    this.get = function(index) {
		  return elems[index];
		};
    this.length = elems.length;
    this.each = function(func) {
		  for(var i = 0; i < elems.length; i++) {
		    func(elems[i], i);
	  	}
	  };
	  this.hide = function() {
	  	this.each(function(elems) {
		    elems.style.display = "none";
      });
      return this;
	  };
    this.show = function() {
      this.each(function(elems) {
        elems.style.display = "block";
      });
      return this;
    };
    this.addClass = function(className) {
      this.each(function(elems) {
        elems.className += className;
      });
      return this;
    };
    this.css = function(object, property) {
       
       // if (arguments.length === 2) {
      if (typeof object == 'string' || object instanceof String) {
        this.each(function(elems) {
          elems.style[object] = property;
        });
      } else {
        this.each(function(elems) {
          for (var prop in object) {
            elems.style[prop] = object[prop]
          }
        });
      };
      return this;
    };
  };

  var myQuery = function (selector) {
    if (selector[0] == '#') {
    selector = selector.slice(1)
    elements = [document.getElementById(selector)]
    }
    else if (selector[0] == '.') {
      class_selector = selector.slice(1)
      elements = document.getElementsByClassName(class_selector)
    }
    else {
      elements = document.getElementsByTagName(selector)
    }
    return new QueryWrapper(elements)
  };


	window.$ = myQuery;
	$.version = "beta"

	$.each = function(array, func) {
	  for(var i = 0; i < array.length; i++) {
	    func(array[i]);
	  }
	};
})();

// FOR EXTENSIONS
// 		var rexClass = 	/(\.[_a-z]+[_a-z0-9-:\\]*)/ig;
// 		var rexId = 		/(#[a-z]+[_a-z0-9-:\\]*)/ig;
// 		var rexTag = 		/([a-z]+[_a-z0-9-:\\]*)/ig;
//    var elements = [];

//     // for (var i = 0; i < selector.length; i++) {
    
//     if ( selector[i].match(rexId) == selector[i] ) {
//     	result = document.getElementById(...);
//     	elements.push(result);
//     }
//     else if (selector[i].match(rexClass) == selector[i] ) {
//     	result = document.getElementByClassName(selector[i]);
//     	elements.push(result);
//     }
//     else if (selector[i].match(rexTag) == selector[i] ) {
//     	result = document.getElementByTagName(selector[i]);
//     	elements.push(result);
//     }
    // };



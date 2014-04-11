(function () {

  var QueryWrapper = function (elems) {
    // this.lastDisplay = "";

    this.get = function(num) {
      if (elems.length === undefined) {
        return elems;
      }
      else {
        return elems[num];
      }
      return this;
    }

    this.length = elems.length;

    this.each = function (f) {
      myQuery.each(elems, f);
      return this;
    };

    this.css = function(property, value) {
      if (typeof property == "string") {
        func = function(i) {
          i.style[property]=value;
        };
        myQuery.each(elems, func);
      }
      else if (typeof property == "object") {
        for (var cssPair in property) {
          func = function(i) {
            i.style[cssPair]=property[cssPair];
          };
          myQuery.each(elems, func);
        }
      }
      return this;
    };

    this.show = function () {
      console.log(this.lastDisplay);
      // this.css("display",this.lastDisplay);
      this.css("display","block");
      return this;
    };

    this.hide = function() {
      // if (elems[0].style.display === "") {
      //   this.lastDisplay = "block";
      // }
      // else {
      //   this.lastDisplay = elems[0].style.display;
      // }
      this.css("display","none");
      return this;
    };

    this.addClass = function(newClass) {
      if (elems[0].className.search(newClass) === -1 ) {
        myQuery.each(elems, function(elem) {
          elem.className = newClass + " " + elem.className;
        });
      }
      return this;
    };
  };

  var myQuery = function (selector) {
    first = selector.charAt(0);
    var elements = []
    switch(first) {
      case '#':
        elements = document.getElementById(selector.slice(1));
        break;
      case '.':
        elements = document.getElementsByClassName(selector.slice(1));
        break;
      default:
        elements = document.getElementsByTagName(selector);
        break;
    }

    return new QueryWrapper(elements);
  };


  window.$ = myQuery;
  myQuery.version = 'beta';

  myQuery.each = function (someArray, f) {
    for (var i = 0; i < someArray.length; i++) {
      f(someArray[i], i);
    };
    return someArray;
  };
})();

(function () {

  var QueryWrapper = function (elems) {
    // TODO
  };

  var myQuery = function (selector) {
    // TODO
    return new QueryWrapper(selector);
  };


  window.$ = myQuery;
  myQuery.version = 'beta';

  myQuery.each = function (someArray, f) {
    for (var i = 0; i < someArray.length; i++) {
      f(someArray[i]);
    };
    return someArray;
  };


})();

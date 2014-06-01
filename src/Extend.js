var extend = function(destination, source) {
  for (var key in source){
    destination[key] = source[key];
  }
    return destination;
  };

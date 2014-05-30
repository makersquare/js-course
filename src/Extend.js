var extend = function(destination, source) {
  for (var i in source) {
    destination[i] = source[i];
  }
  return destination;
};

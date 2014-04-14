var extend = function(destination, source) {
  for (var prop in source) {
    destination[prop] = source[prop];
  }
  return destination;
};

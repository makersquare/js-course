var extend = function(destination,source) {
  // for object all properties in source
  // put in object destination
  // therefore you need to iterate through source object
  // do something in block so it is added to the destination object
  for(var prop in source) {
    destination[prop] = source[prop]
  }
  return destination;
};


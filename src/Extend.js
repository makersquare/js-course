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

<<<<<<< HEAD
=======


>>>>>>> 86109715cf79f09114f0713e8d98e2d02ce5e238

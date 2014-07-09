var extend = function(dest, source){
  for (var property in source) {
    dest[property] = source[property];
  }
  return dest;
};

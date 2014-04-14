var extend = function(dest, srce) {
  for(var prop in srce){
    dest[prop] = srce[prop];
  };
  return dest;
};

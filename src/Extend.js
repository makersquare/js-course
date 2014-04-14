var extend = function(destination, source) {
   for (var key in source) {
      temp = source[key]
      destination[key] = temp;
   }

   return destination;

};

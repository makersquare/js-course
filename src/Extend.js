var extend = function(destination, source) {
	for (prop in source) destination[prop] = source[prop];
	return destination;
};
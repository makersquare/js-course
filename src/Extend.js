var extend = function(destination, source) {
	Object.keys(source).forEach(function(prop) {
		destination[prop] = source[prop];
	})
	return destination;
};
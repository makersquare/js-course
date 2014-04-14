var extend = function(dest, src) {
	for (var prop in src) {
		dest[prop] = src[prop];
	}
	return dest;
};
// Simple, one-usage module.
var Upper = (function() {
	return function(string) {
		return string.toUpperCase();
	}
})();
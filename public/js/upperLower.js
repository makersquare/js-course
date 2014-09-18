var UpperLower = (function(upper, lower) {
	return function(string) {
		var upperLowerString = "";
		var length = string.length;
		for (var i = 0; i < length; i++) {
			if (i % 2 == 0) {
				upperLowerString += upper(string[i]);
			} else {
				upperLowerString += lower(string[i]);
			}
 		}
		return upperLowerString;
	}
})(Upper, Lower);
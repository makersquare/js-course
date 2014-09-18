// I decided to make this shuffle individual words
var ModifyString = (function(_) {
	return function(string) {
		var shuffled = [];
		var words = string.split(' ');
		for (var i in words) {
			shuffled.push(_.shuffle(words[i]).join(''));
		}
		return shuffled.join(' ');
	}
})(_);
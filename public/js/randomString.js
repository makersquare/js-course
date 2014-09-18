// I decided to make this shuffle individual words
var RandomString = function() {
	function randInt(max) {
		return Math.floor(Math.random() * (max - 1));
	}
	var string = "";
	var chars = [
		'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l',
		'm', 'n', 'o', 'p', 'q', 'r',
		's', 't', 'u', 'v', 'w', 'x',
		'y', 'z'
	];
	var wordCount = randInt(30);

	for (var i = 0; i < wordCount; i++) {
		var charCount = randInt(10);
		var word = "";
		for (var j = 0; j < charCount; j++) {
			word += chars[randInt(chars.length)];
		}
		string += " " + word;
	}

	return string;
};
// Intro to basic constructor functions
function Bell(soundUrl) {
	this.ring = function(callback) {
		// You'll need to define this.sound
		// this.sound.play();
		if (callback) {
			callback();
		}
	};
}

// Instantiation code goes here. Example:
// var gong = new Bell('sounds/gong.mp3')
var endpointCount = 72;
for (var i = 0; i < endpointCount; i++) {
	// Make a call to our server, requesting a set of data.
	// The data we get back is a chunk of strings that form
	// a larger message.
	(function(i) {
		$.ajax({
			type: 'GET',
			url: '/' + i,
			success: function() {
				console.log('Got back success from call ' + i + '!');
			}
		});
	})(i);
}
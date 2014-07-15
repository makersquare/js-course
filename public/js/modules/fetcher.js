define(['jquery', 'modules/completionChecker', 'modules/callbackObjects'], function($, completionChecker, callbackObjects) {
	function fetchPosts(count) {
		// We replaced our set endpointCount with just "count"
		for (var i = 0; i < count; i++) {
			// Make a call to our server, requesting a set of data.
			// The data we get back is a chunk of strings that form
			// a larger message.
			(function(i) {
				callbackObjects.push({
					id: i,
					done: false
				});
				$.ajax({
					type: 'GET',
					url: '/' + i,
					success: function(response) {
						console.log('Got back success from call ' + i + '!');
						callbackObjects[i].done = true;
						callbackObjects[i].data = JSON.parse(response);
						// Check whether or not we've finished
						completionChecker(callbackObjects[i]);
					}
				});
			})(i);
		}
	}

	// We return an object with "fetch" as a property that refers to fetchPosts method
	return {
		fetch: fetchPosts
	};
});
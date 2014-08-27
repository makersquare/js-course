var callbackObjects = [];
var allDone = false;
function checkCompletion(callback, reverse) {
	// Make sure we don't run this multiple times once we're done
	if (allDone) return;
	for (var i in callbackObjects) {
		// If any callback object is not complete, break out of our function
		if (!callbackObjects[i].done) return false;
	}
	allDone = true;
	var data = sortAndReturnData(reverse);
	callback(data);
	// Reset for next run
	callbackObjects = [];
	allDone = false;
}

function retrieveData(callback, reverse) {
	var endpointCount = 77;
	for (var i = 0; i < endpointCount; i++) {
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
					checkCompletion(callback, reverse);
				}
			});
		})(i);
	}
}

function sortAndReturnData(reverse) {
	console.log('Sorting and returning');
	if (reverse) {
		callbackObjects.sort(function(a, b) {
			return b.id - a.id;
		});
	} else {
		callbackObjects.sort(function(a, b) {
			return a.id - b.id;
		});
	}
	var finalString = '';
	for (var i in callbackObjects) {
		console.log(callbackObjects[i])
		for (var j in callbackObjects[i].data) {
			finalString += callbackObjects[i].data[j];
		}
	}
	return finalString.replace(/\n/g, "<br />");
}

// Retrieve data
retrieveData(function(data) {
	// Append data
	$('#container').append(data);
	// Add a little space... don't use BRs like me
	$('#container').append('<br><br>');
	// Wait 3 seconds
	setTimeout(function() {
		// Retrieve data again
		retrieveData(function(secondData) {
			// Append again
			$('#container').append(secondData);
		}, true); // <-- reverse = true
	}, 3000)
});

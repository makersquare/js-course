var callbackObjects = [];
var allDone = false;
function checkCompletion(callback) {
	// Make sure we don't run this multiple times once we're done
	if (allDone) return;
	for (var i in callbackObjects) {
		// If any callback object is not complete, break out of our function
		if (!callbackObjects[i].done) return false;
	}
	allDone = true;
	var data = sortAndReturnData();
	callback(data);
}

function retrieveData(callback) {
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
					checkCompletion(callback);
				}
			});
		})(i);
	}
}

function sortAndReturnData() {
	console.log('Sorting and returning');
	callbackObjects.sort(function(a, b) {
		return a.id - b.id;
	});
	var finalString = '';
	for (var i in callbackObjects) {
		console.log(callbackObjects[i])
		for (var j in callbackObjects[i].data) {
			finalString += callbackObjects[i].data[j];
		}
	}
	return finalString.replace(/\n/g, "<br />");
}

retrieveData(function(data) {
	$('#container').append(data);
});

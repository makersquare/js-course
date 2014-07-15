define(['modules/callbackObjects', 'modules/sorter'], function(callbackObjects, sorter) {
	function checkCompletion(callback) {
		// Make sure we don't run this multiple times once we're done
		for (var i in callbackObjects) {
			// If any callback object is not complete, break out of our function
			if (!callbackObjects[i].done) return false;
		}
		var data = sorter.sort(callbackObjects);
		callback(data);
	}

	return {
		checkCompletion: checkCompletion
	};
});
define(function() {
	// Sorter doesn't care what objects it gets specifically, so long as they're formed right
	function sortAndReturnData(objects) {
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

	return {
		sort: sortAndReturnData
	};
});

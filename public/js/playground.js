var endpointCount = 72;
for (var i = 0; i < endpointCount; i++) {
	$.ajax({
		type: 'GET',
		url: '/' + i,
		success: function() {
			console.log('Got back succes from call ' + i + '!');
		}
	});
}
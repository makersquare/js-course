require(['modules/fetcher'], function(fetcher) {
	fetcher.fetch(77, function(data) {
		$('#container').append(data);
	});
});
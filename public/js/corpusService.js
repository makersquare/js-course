var CorpusRequestService = (function($) {
	function getCorpus(ip, callback) {
		$.ajax({
			url: '/corpus/' + ip,
			type: 'GET',
			success: function(data) {
				callback(data);
			},
			error: function(e) {
				console.log(e);
			}
		});
	}

	return {
		get: getCorpus
	}
})(jQuery);
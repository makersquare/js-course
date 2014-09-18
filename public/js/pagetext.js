var PageTextService = (function($) {
	function getPageText(uri, callback) {
		$.ajax({
			url: '/text',
			type: 'GET',
			data: {
				url: decodeURIComponent(uri)
			},
			success: function(data) {
				callback(data);
			},
			error: function(e) {
				console.log(e);
			}
		});
	}

	return {
		get: getPageText
	}
})(jQuery);
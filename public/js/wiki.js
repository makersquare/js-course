var WikiService = (function($) {
	function getParagraphs(title, paragraphCount, callback) {
		if (typeof paragraphCount === 'function') {
			callback = paragraphCount;
			paragraphCount = 100;
		}
		$.ajax({
			url: '/wiki/' + title,
			type: 'GET',
			data: {
				paragraphs: paragraphCount
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
		get: getParagraphs
	}
})(jQuery);
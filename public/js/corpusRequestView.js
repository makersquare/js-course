var CorpusRequestView = (function($, corpus) {
	function Constructor(containerSelector, markovView) {
		var $container = $(containerSelector);
		var preppedTemplate = _.template($('.templates #corpus-view').html());
		// No data to interpolate here
		this.$view = $(preppedTemplate({}));

		// Cache references to text areas
		this.$ipInput = this.$view.find('.ip-input');

		// Modify
		this.$view.find('.corpus-button').on('click', function() {
			var ip = this.$ipInput.val();
			corpus.get(ip, function(data) {
				markovView.$input.val(data);
			});
		}.bind(this));

		this.$view.appendTo($container);
	}

	return Constructor;
})(jQuery, CorpusRequestService);
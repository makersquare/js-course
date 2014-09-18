var PageRequestView = (function($, page) {
	function Constructor(containerSelector, markovView) {
		var $container = $(containerSelector);
		var preppedTemplate = _.template($('.templates #page-view').html());
		// No data to interpolate here
		this.$view = $(preppedTemplate({}));

		// Cache references to text areas
		this.$urlInput = this.$view.find('.url-input');

		// Modify
		this.$view.find('.page-button').on('click', function() {
			var url = this.$urlInput.val();
			page.get(url, function(data) {
				markovView.$input.val(data);
			});
		}.bind(this));

		this.$view.appendTo($container);
	}

	return Constructor;
})(jQuery, PageTextService);
var WikiRequestView = (function($, wiki) {
	function Constructor(containerSelector, markovView) {
		var $container = $(containerSelector);
		var preppedTemplate = _.template($('.templates #wiki-view').html());
		// No data to interpolate here
		this.$view = $(preppedTemplate({}));

		// Cache references to text areas
		this.$titleInput = this.$view.find('.title-input');
		this.$paragraphsInput = this.$view.find('.paragraphs-input');

		// Modify
		this.$view.find('.wiki-button').on('click', function() {
			var title      = this.$titleInput.val();
			var paragraphs = parseInt(this.$paragraphsInput.val(), 10);
			wiki.get(title, paragraphs, function(data) {
				markovView.$input.val(data);
			});
		}.bind(this));

		this.$view.appendTo($container);
	}

	return Constructor;
})(jQuery, WikiService);
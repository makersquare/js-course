var MarkovView = (function($, Markov, modifier, random) {
	var generateMarkov = function(input) {
		return new Markov(input, "ww").gen(50);
	}
	function Constructor(containerSelector) {
		var $container = $(containerSelector);
		var preppedTemplate = _.template($('.templates #markov-view').html());
		// No data to interpolate here
		this.$view = $(preppedTemplate({}));

		// Cache references to text areas
		this.$input = this.$view.find('.input-textarea');
		this.$output = this.$view.find('.output-textarea');

		// Modify
		this.$view.find('.modify-button').on('click', function() {
			var input  = this.$input.val();
			var output = modifier(input);
			this.$input.val(output);
		}.bind(this));

		// Random
		this.$view.find('.random-button').on('click', function() {
			this.$input.val(random());
		}.bind(this));

		// Markov conversion
		this.$view.find('.markov-button').on('click', function() {
			var input  = this.$input.val();
			var output = generateMarkov(input);
			this.$output.val(output);
		}.bind(this));

		this.$view.appendTo($container);

	}

	return Constructor;
})(jQuery, Markov, ModifyString, RandomString);
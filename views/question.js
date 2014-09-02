(function(app) {
	app.Views = app.Views || {};

	app.Views.QuestionView = function(questionModel) {
		var me     = this;
		this.model    = questionModel;
		// Keep track of containing view
		this.quizView = this.model.quiz.view;
		// Use our utility function to construct a jQuery object-wrapped view
		var $view  = $(app.Util.buildTemplate('template-question', {
			question: this.model.question,
			choices: this.model.choices,
			name: this.model.name
		}));
		// Bind click events to elements that will be appended to document
		$view.find('input[type="submit"]').on('click', function() {
			app.Controller.checkAnswer(
				$view.find('input[type="radio"]:checked').val(),
				me.model
			);
		});

		// Expose publicly accessible hide function
		this.hide = function() {
			$view.hide();
		};
		// Expose publicly accessible show function
		this.show = function() {
			$view.show();
		};
		// Expose publicly accessible remove function
		this.remove = function() {
			$view.remove();
		}

		// Hide by default;
		this.hide();

		// Actually append view to document, at the quiz view's $questionContainer
		this.quizView.$questionContainer.append($view);
	};
})(Quizzy._app);

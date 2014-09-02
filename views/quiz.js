(function(app) {
	app.Views = app.Views || {};

	app.Views.QuizView = function($container, model) {
		this.model = model;
		var $view = $(app.Util.buildTemplate('template-quiz', this.model));
		$view.find('.js-back').on('click', function() {
			app.Controller.showQuizListing();
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

		this.$questionContainer = $view.find('.quiz-questions');
		$container.append($view);
	};

})(Quizzy._app);
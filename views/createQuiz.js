(function(app) {
	app.Views = app.Views || {};

	app.Views.CreateQuizView = function($container, quizzes) {
		var $view = $(app.Util.buildTemplate('template-create-quiz', {
			quizzes: quizzes,
			edit: false
		}));
		$view.find('.js-done').on('click', function() {
			var val = $view.find('#quiz-name').val();
			// Empty strings are falsy so we're checking for this
			if (val) {
				app.Controller.createQuiz($view.find('#quiz-name').val());
				app.Controller.showQuizListing();
			}
		});
		$view.find('.js-back').on('click', function() {
			app.Controller.showQuizListing();
		});
		$container.append($view);
	};
})(Quizzy._app);

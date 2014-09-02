(function(app) {
	app.Views = app.Views || {};

	app.Views.EditQuizView = function($container, quiz) {
		// Here I'm reusing the create quiz template and optionally changing the title
		var $view = $(app.Util.buildTemplate('template-create-quiz', {
			quiz: quiz,
			edit: true
		}));
		$view.find('.js-done').on('click', function() {
			var title = $view.find('#quiz-name').val();
			// Empty strings are falsy so we're checking for this
			if (title) {
				quiz.title = title;
				quiz.save();
				app.Controller.showQuizListing();
			}
		});
		$view.find('.js-create-question').on('click', function() {
			app.Controller.showCreateQuestion(quiz.id);
		});
		$view.find('.js-edit-question').on('click', function() {
			var questionId = parseInt($(this).attr('data-id'), 10);
			app.Controller.showEditQuestion(quiz.id, questionId);
		});
		$view.find('.js-back').on('click', function() {
			app.Controller.showQuizListing();
		});
		$container.append($view);
	};
})(Quizzy._app);

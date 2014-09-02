(function(app) {
	app.Views = app.Views || {};

	app.Views.ListingView = function($container, quizzes) {
		var $view = $(app.Util.buildTemplate('template-listing', {
			quizzes: quizzes
		}));
		$view.find('.js-make-quiz').on('click', function() {
			app.Controller.showCreateQuiz();
		});
		$view.find('.js-take-quiz').on('click', function() {
			var id = parseInt($(this).attr('data-id'));
			app.Controller.showQuiz(id);
		});
		$view.find('.js-edit-quiz').on('click', function() {
			var id = parseInt($(this).attr('data-id'));
			app.Controller.showEditQuiz(id);
		});
		$container.append($view);
	};

})(Quizzy._app);
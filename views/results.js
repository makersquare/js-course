(function(app) {
	app.Views = app.Views || {};

	app.Views.ResultsView = function($container, resultsData) {
		var $view = $(app.Util.buildTemplate('template-results', resultsData));
		$view.find('.js-back').on('click', function() {
			app.Controller.showQuizListing();
		});
		$container.append($view);
	}
})(Quizzy._app);
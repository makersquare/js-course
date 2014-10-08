(function(app) {
	app.Views = app.Views || {};

	// Assign View to collected "Views" object on my application.
	app.Views.CreateQuestionView = function($container, quizId) {
		var $view = $(app.Util.buildTemplate('template-create-question', {
			edit: false
		}));
		// 4 by default
		var choiceCount = 4;
		// Append a new choice
		$view.find('.js-add-choice').on('click', function() {
			choiceCount++;
			$view.find('.choices').append([
				'<label for="choice' + choiceCount + '">Choice ' + choiceCount + '</label>',
				'<input type="text" class="choice-input" id="' + choiceCount + '">'
			].join(''))
		});
		// Actually create question
		$view.find('.js-done').on('click', function() {
			var question = $view.find('#question').val();
			var answer = $view.find('#answer').val();
			// Iterate over the choice inputs and push each value in
			var choices = [];
			$view.find('.choice-input').each(function() {
				var value = $(this).val();
				choices.push(value);
			});
			// There ideally would be some good validation here
			app.Controller.createQuestion({
				quizId: quizId,
				question: question,
				answer: answer,
				choices: choices,
				answered: 0,
				right: 0
			});
			app.Controller.showQuizListing();
		});
		$view.find('.js-back').on('click', function() {
			app.Controller.showQuizListing();
		});
		$container.append($view);
	};
})(Quizzy._app);

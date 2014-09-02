(function(app) {
	app.Views = app.Views || {};

	app.Views.EditQuestionView = function($container, question) {
		// Here I'm reusing the create quiz template and optionally changing the title
		var $view = $(app.Util.buildTemplate('template-create-question', {
			quiz: question.quiz,
			question: question,
			edit: true
		}));
		var choiceCount = question.choices.length;
		// Set up view with initial choices
		var $choices = $view.find('.choices');
		for (var i = 0; i < choiceCount; i++) {
			$choices.append([
				'<label for="choice' + i + '">Choice ' + i + '</label>',
				'<input type="text" class="choice-input" id="' + i + '" value="' + question.choices[i] + '">'
			].join(''))
		}
		// Append a new choice
		$view.find('.js-add-choice').on('click', function() {
			choiceCount++;
			$view.find('.choices').append([
				'<label for="choice' + choiceCount + '">Choice ' + choiceCount + '</label>',
				'<input type="text" class="choice-input" id="' + choiceCount + '">'
			].join(''))
		})
		$view.find('.js-done').on('click', function() {
			var questionVal = $view.find('#question').val();
			var answerVal = $view.find('#answer').val();
			// Iterate over the choice inputs and push each value in
			var choicesVal = [];
			$view.find('.choice-input').each(function() {
				var value = $(this).val();
				choicesVal.push(value);
			});
			question.question = questionVal;
			question.answer   = answerVal;
			question.choices  = choicesVal;
			// Here we're reaching directly into the model because there's little other
			// work to do in terms of side effects of business logic
			question.save();
			// Force questions to be reloaded in quiz
			question.quiz.loadQuestions();
			app.Controller.showEditQuiz(question.quiz.id);
		});
		$view.find('.js-back').on('click', function() {
			app.Controller.showEditQuiz(question.quiz.id);
		});
		$container.append($view);
	};

})(Quizzy._app);

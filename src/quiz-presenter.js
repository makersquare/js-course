// Presenter
(function () {

	window.QuizPresenter = {}

	var $form = $('.quiz-form')

	//
	// Questions View
	//
	QuizPresenter.renderQuizzes = function () {
		$form.empty()

		var questionDivs = Quiz.questions.map(function (question) {
			return $('<div>').addClass('question').attr('data-id', question.id).append(
				$('<h3>').text(question.content),

				question.options.map(function (option, idx) {
					return $('<div>').addClass('option').append(
						$('<input>').attr({ type: 'radio', name: 'question_'+question.id, value: idx }),
						$('<label>').text(option)
					)
				})
			)
		})
		$form.append(
			$('<div>').addClass('questions').append(questionDivs),
			$('<button>').attr('type', 'submit').text("Submit Quiz")
		)
	}

	//
	// Handle Submit
	//
	$form.on('submit', function (e) {
		e.preventDefault()

		var answers = $form.find('.question').toArray().map(function (elem) {
			return {
				questionId: parseInt( elem.getAttribute('data-id') ),
				index: parseInt( $('[type=radio]:checked', elem).val() )
			}
		})
		var results = Quiz.grade(answers)
		QuizPresenter.renderQuizResults(results)
	})

	//
	// Results View
	//
	QuizPresenter.renderQuizResults = function (results) {
		$form.empty()
		$form.append(renderResults(results))
	}

	function renderResults (results) {
		return $('<div>').addClass('results').append(
			"<label>Score:</label> ",
			results.correct + " / " + results.total
		)
	}

})()

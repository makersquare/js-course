// Here I return an object to the Quizzy global variable that has one method,
// start(). When called, this will generate models and list out all quizzes.
var Quizzy = (function() {
	// Declaring this variable so you know it exists, but
	// quizData passed in from the outside.
	var quizData;
	// Index of the question we're on
	var currentQuestion = 0;
	// How many high scores to keep
	var highScoreCount  = 10;

	var app  = {
		Util: {},
		quizModels: [],
		// I like to explicitly set things to undefined so other developers
		// know that this is supposed to be set at some point
		$quizzyContainer: undefined,
		currentQuizIndex: undefined,
		currentQuestionIndex: undefined
	};
	app.Util = {
		buildTemplate: function(templateId, locals) {
			// Grab template
			var template = $('#' + templateId).html();
			// Prepare template function
			var preppedTemplate = _.template(template);
			// Interpolate template
			return preppedTemplate(locals);
		}
	};
	// Set up Models property if it doesn't exist
	app.Models = app.Models || {};
	app.Models.generateQuizModels = function() {
		// Grab available ids
		var ids = app.Controller.getQuizIds();
		if (!ids) return;
		for (var i = 0; i < ids.length; i++) {
			app.quizModels.push(
				// If you're wondering --wait, we haven't defined this yet?-- we can
				// do this because by the time we actually call generateQuizModels,
				// app.Models.QuizModel will have been defined
				new app.Models.QuizModel({
					id: ids[i]
				})
			);
		}
	};

	function startApplication(selector, quizData) {
		app.$quizzyContainer = $(selector);

		// Generate our models.
		app.Models.generateQuizModels();

		// Show the quiz listing
		app.Controller.showQuizListing();
	}

	return {
		_app: app,
		start: startApplication
	}
})();

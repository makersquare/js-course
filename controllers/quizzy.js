(function(app) {
	app.Controller = {
		// Because we can't automatically know what quiz information we have
		// stored in localStorage, I need to get and maintain a list of quizIds
		// that currently exist. Annoying, but them's the breaks with localStorage.
		getQuizIds: function() {
			var qids = localStorage.getItem('qids');
			if (qids) {
				qids = qids.split(',');
				// Coerce to ints
				for (var i in qids) {
					qids[i] = parseInt(qids[i], 10);
				}
			} else {
				qids = [];
			}
			return qids;
		},
		getQuizById: function(id) {
			var quiz = _.findWhere(app.quizModels, {
				id: id
			});
			return quiz;
		},
		getQuestionById: function(quizId, questionId) {
			var quiz = _.findWhere(app.quizModels, {
				id: quizId
			});
			var question = _.findWhere(quiz.questionModels, {
				id: questionId
			});
			return question;
		},
		checkAnswer: function(input, questionModel) {
			var correct = input === questionModel.answer;
			questionModel.incrementAnswered(correct);
			if (correct) {
				questionModel.quiz.incrementScore();
				alert('You got it!!! *cheering*');
			} else {
				alert('NOPE!! TRY AGAIN');
			}
			app.Controller.nextQuestion(questionModel.quiz);
		},
		nextQuestion: function(quizModel) {
			quizModel.questionModels[quizModel.questionIndex].view.hide();
			quizModel.questionIndex = quizModel.questionIndex + 1;
			// If we have the next question, show it, otherwise show results
			if (quizModel.questionModels[quizModel.questionIndex]) {
				quizModel.questionModels[quizModel.questionIndex].view.show();
			} else {
				app.Controller.showScore(quizModel);
			}
		},
		showQuizListing: function() {
			// Clear out views
			app.$quizzyContainer.empty();

			// Show the listing
			app.$quizzyContainer.append(
				new app.Views.ListingView(app.$quizzyContainer, app.quizModels)
			);
		},
		showCreateQuiz: function() {
			app.$quizzyContainer.empty();
			new app.Views.CreateQuizView(app.$quizzyContainer);
		},
		showCreateQuestion: function(quizId) {
			app.$quizzyContainer.empty();
			new app.Views.CreateQuestionView(app.$quizzyContainer, quizId);
		},
		showEditQuiz: function(id) {
			app.$quizzyContainer.empty();

			// Find the quiz model corresponding to the id clicked
			var quiz = app.Controller.getQuizById(id);
			new app.Views.EditQuizView(app.$quizzyContainer, quiz);
		},
		showEditQuestion: function(quizId, questionId) {
			app.$quizzyContainer.empty();

			var question = app.Controller.getQuestionById(quizId, questionId);
			new app.Views.EditQuestionView(app.$quizzyContainer, question);
		},
		// Create a quiz and automatically assign it an available id
		createQuiz: function(title) {
			var existingIds = app.Controller.getQuizIds();
			var seekingAvailable = true;
			var index = 0;
			if (existingIds) {
				while (seekingAvailable) {
					// If this index does NOT exist in the existingIds, use it
					if (_.indexOf(existingIds, index) == -1) {
						seekingAvailable = false;
						break;
					} else {
						index++;
					}
				}
			}
			// Generate a new QuestionModel and add it to our application.
			// Pass true to keep QuizModel from automatically grabbing data
			// from localStorage, which we haven't put in yet
			app.quizModels.push(new app.Models.QuizModel({
				title: title,
				id: index
			}, true));
		},
		// Similar to above. This is not very DRY.
		createQuestion: function(options) {
			var quiz = app.Controller.getQuizById(options.quizId);
			options.quiz = quiz;
			quiz.questionModels.push(
				new app.Models.QuestionModel(options, true) // true for serialize immediately
			);
		},
		showQuiz: function(id) {
			app.$quizzyContainer.empty();

			var quiz = app.Controller.getQuizById(id);
			quiz.generateView();
			quiz.questionModels[0].view.show();
		},
		showScore: function(quizModel) {
			app.$quizzyContainer.empty();

			// Check high score and alter state if fitting
			quizModel.checkHighScore();

			new app.Views.ResultsView(app.$quizzyContainer, {
				quizScore: quizModel.calculateScore(),
				quiz: quizModel,
				highScores: quizModel.highScores
			});
			// reset state
			quizModel.currentScore  = 0;
			quizModel.questionIndex = 0;
		}
	};
})(Quizzy._app);

 		
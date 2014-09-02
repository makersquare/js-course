(function(app) {
	app.Models = app.Models || {};
	// This is because I am lazy and typing is boring. wondering why the .bind()?
	// I need to prep the function with the correct context, otherwise the browser
	// will flip out
	var get = localStorage.getItem.bind(localStorage);

	function getQuestionData(id) {
		// Format of our data in localStorage (I could probably just
		// store a JSON string, but I am being finnicky here):
		// q[id]_qids  = comma separated list of available question ids
		// q[id]_q[qid]_question = actual question to quiz question by id
		// q[id]_q[qid]_choices  = comma separated list of choices
		// q[id]_q[qid]_answer   = actual answer
		// q[id]_q[qid]_answered = number of times answered total
		// q[id]_q[qid]_right    = number of times answered right
		var questions = [];
		// Comma separated list of available questions -> array
		var questionIds  = get('q' + id + '_qids');
		if (questionIds) {
			questionIds = questionIds.split(',');
		} else {
			questionIds = [];
		}

		// Grab available question ids
		for (var i = 0; i < questionIds.length; i++) {
			var q = {
				id: parseInt(questionIds[i], 10),
				question: get('q' + id + '_q' + questionIds[i] + '_question'),
				choices:  get('q' + id + '_q' + questionIds[i] + '_choices').split(','),
				answer:   get('q' + id + '_q' + questionIds[i] + '_answer'),
				answered: parseInt(get('q' + id + '_q' + questionIds[i] + '_answered'), 10),
				right:    parseInt(get('q' + id + '_q' + questionIds[i] + '_right'), 10),
			};
			questions.push(q);
		}
		return questions;
	}

	app.Models.QuizModel = function(options, dontGetData) {
		this.questionModels = [];
		this.questionIndex  = 0;
		this.currentScore = 0;

		// Breaks high scores out of string stored structure and represents as an array
		// of objects containing player names and score keys.
		this.getHighScores = function() {
			// Format for high scores:
			// q[id]_highscores = all high scores in format player:score,player:score
			var hsString = localStorage.getItem('q' + this.id + '_highscores');
			if (hsString) {
				var coupledHighScores = hsString.split(',');
				var hsObject = [];
				for (var i in coupledHighScores) {
					var decoupled = coupledHighScores[i].split(':');
					var name  = decoupled[0]
					var score = decoupled[1];
				}
				hsObject.push({
					name: name,
					score: score
				});
				// Sort
				hsObject = _.sortBy(hsObject, function(obj) {
					return obj.score;
				});
				return hsObject;
			} else {
				return [];
			}
		};

		this.constructHighScoreString = function() {
			var hsString = '';
			for (var i in this.highScores) {
				var score = this.highScores[i];
				hsString += score.name + ':' + score.score;
				// Add a comma if there is a next value
				if (this.highScores[parseInt(i, 10) + 1]) hsString += ',';
			}
			return hsString;
		};

		this.getQuestionIds = function() {
			var qids = get('q' + this.id + '_qids');
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
		};

		// I want this to be accessible because if we change the questions, I want to
		// reload them from localStorage and trigger this in the controller.
		this.loadQuestions = function() {
			this.questionModels = [];
			var questionData = getQuestionData(this.id);
			for (var i in questionData) {
				questionData[i].quiz = this;
				this.questionModels.push(new app.Models.QuestionModel(questionData[i]));
			}
		}

		// Publicly accessible method to serialize to localStorage.
		this.save = function() {
			// The only thing to update here would be the title and high scores.
			// We don't allow changing of the ids, and questions are changed
			// via QuestionModel
			localStorage.setItem('q' + this.id + '_title', this.title);

			// Add this to available qids if it's not already.
			var qids = app.Controller.getQuizIds();

			// Add our qid if qids doesn't have it
			if (_.indexOf(qids, this.id) == -1) {
				qids.push(this.id);
				// Great, now store
				localStorage.setItem('qids', qids.join(','));
			}

			localStorage.setItem('q' + this.id + '_highscores', this.constructHighScoreString());
		};
		
		if (options) {
			// I tried to be less verbose with simple truthy/falsy (if (options.id)),
			// but I realized that 0 evaluates to false and so it would have incorrect
			// results when evaluating the truthiness of index 0.
			if (typeof options.id !== 'undefined' &&
				typeof options.title !== 'undefined') {
				this.title = options.title;
				this.id    = options.id;
			} else if (options.id && dontGetData) {
				// If there's no title then there's nothing to store when we're not getting the data
				throw new Error('A title is required if you do not allow data grabbing with an id.');
			}
		} else {
			throw new Error('You have to pass SOMETHING here! (title or existing id)');
		}

		// Why would we NOT want to get the data? If we're creating a new quiz
		// and there's no actual localStorage data yet. Note that below runs
		// if we don't don't want to get the data, which means that we _do_ want
		// to get data. This is the default behavior (because dontGetData, if not
		// set, is undefined, which evaluates to false).
		if (!dontGetData) {
			this.title = get('q' + options.id + '_title');
			this.id    = options.id;
		} else {
			this.save();
		}

		this.incrementScore = function() {
			this.currentScore = this.currentScore + 1;
		};

		this.calculateScore = function() {
			var score = this.currentScore / this.questionModels.length * 100;
			return score;
		};

		this.generateView = function() {
			// Remove old view if it exists
			if (this.view) this.view.remove();
			this.view = new app.Views.QuizView(app.$quizzyContainer, this);

			for (var i in this.questionModels) {
				this.questionModels[i].generateView();
			}
		}

		// Check whether the score is a high score, and if so, add and serialize it
		this.checkHighScore = function() {
			var score = this.calculateScore();
			// Run a check if we have hit the max number of high scores
			if (this.highScores.length > 5) {
				var greaterThanLeast = false;
				var index = undefined;
				// Iterate backwards because I want to check against successively larger scores
				for (var i = this.highScores.length - 1; i >= 0; i--) {
					if (score > this.highScores[i]) {
						greaterThanLeast = true;
						index = i;
					} else {
						break;
					}
				}
				if (greaterThanLeast) {
					// SUPER awful
					var name = prompt('Whoa! What\'s your name?');
					this.highScores = this.highScores.splice(index, 0, {
						name: name,
						score: score
					});
					// Remove all values after 10
					if (this.highScores.length > 10) {
						score = this.highScores.splice(10, Number.MAX_VALUE);
					}
					// Serialize high scores
					this.save();
				}
			} else {
				// SUPER awful
				var name = prompt('Whoa! What\'s your name?');
				this.highScores.push({
					name: name,
					score: score
				});
				this.save();
			}
		};

		this.highScores = this.getHighScores();

		this.generateView();

		this.loadQuestions();
	};

})(Quizzy._app);

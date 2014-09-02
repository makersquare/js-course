(function(app) {
	app.Models = app.Models || {};

	app.Models.QuestionModel = function(questionData, serialize) {
		// Repeated from models/quiz.js for reference
		// Format of our data in localStorage (I could probably just
		// store a JSON string, but I am being finnicky here):
		// q[id]_q[qid]_question = actual question to quiz question by id
		// q[id]_q[qid]_choices  = comma separated list of choices
		// q[id]_q[qid]_answer   = actual answer
		// q[id]_q[qid]_answered = number of times answered total
		// q[id]_q[qid]_right    = number of times answered right

		// Assign data to model
		this.id       = questionData.id;
		this.question = questionData.question;
		this.answer   = questionData.answer;
		this.choices  = questionData.choices;
		this.answered = questionData.answered || 0;
		this.right    = questionData.right || 0;
		this.quiz     = questionData.quiz;

		// A list of properties I'm allowing to be serialized
		var serializable = ['question', 'answer', 'choices', 'answered', 'right', 'id'];

		// Set up publicly accessible function to save all data
		this.save = function() {
			// If we haven't provided an id (i.e., the question already exists),
			// then find one available and generate it
			if (typeof this.id === 'undefined') {
				// Add this to available qids if it's not already.
				var questionIds = this.quiz.getQuestionIds();

				var seekingAvailable = true;
				var index = 0;
				if (questionIds) {
					while (seekingAvailable) {
						// If this index does NOT exist in the existingIds, use it
						if (_.indexOf(questionIds, index) == -1) {
							seekingAvailable = false;
							break;
						} else {
							index++;
						}
					}
				}
				this.id = index;

				questionIds.push(this.id);
				// Great, now store
				localStorage.setItem(
					'q' + this.quiz.id.toString() + '_qids',
					questionIds.join(',')
				);
			}

			for (var i in this) {
				var quizId = this.quiz.id;
				// Make sure this property is allowed to be serialized
				if (_.indexOf(serializable, i) !== -1) {
					// Construct correct property string
					var key = 'q' + quizId.toString() + '_q' + this.id.toString() + '_' + i;
					var value = this[i];
					// Check if the value is an array
					if ($.isArray(value)) {
						// Turn into comma-separated string of values
						value = value.join(',');
					}
					// OK, finally actually set the value in localStorage
					localStorage.setItem(key, value);
				}
			}
		};

		// This one's a little weird. Since I'm delegating all work in terms of getting
		// question data to the QuizModel (which has knowledge of what question ids are
		// available), I'm just going to serialize the data directly into localStorage
		// if that's what we need to do (for instance, when creating a new question).
		if (serialize) {
			this.save();
		}

		// Call this if someone answered the question and indicate correctness
		this.incrementAnswered = function(correct) {
			// Update locally
			this.answered = this.answered + 1;
			if (correct) this.right = this.right + 1;
			// Persist
			this.save();
		};

		this.generateView = function() {
			// Remove old view if it exists
			if (this.view) this.view.remove();
			this.view = new app.Views.QuestionView(this);
		}

		this.generateView();
	};
})(Quizzy._app);

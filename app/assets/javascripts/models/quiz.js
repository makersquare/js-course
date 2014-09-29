(function() {
	window.QuizModel = function(data) {
		this.id    = data.id;
		this.title = data.title;
		this.questionModels = [];
	};

	/*
	 * This will fetch data for all of the quizes,
	 * create models with the data, and execute
	 * the callbacks with the list of models
	 */
	window.QuizModel.fetch = function(callback) {
		$.ajax({
      url: '/quizzes',
      type: 'GET',
      success: function(quizzes) {
        var result = [];
        for (var i = 0; i < quizzes.length; i++) {
          result.push(new QuizModel(quizzes[i]));
        }
        callback(result);
      }
    });
	};

	window.QuizModel.prototype.create = function(callback) {
		$.ajax({
      url: '/quizzes',
      type: 'POST',
      success: function(quiz) {
        callback(new QuizModel(quiz));
      }
    });
	};

	window.QuizModel.prototype.update = function(callback) {
		$.ajax({
      url: '/quizzes' + this.id,
      type: 'PATCH',
      success: function(quiz) {
        callback(new QuizModel(quiz));
      }
    });
	};

	window.QuizModel.prototype.save = function(callback) {
    if (this.id) {
      this.update(callback);
    } else {
      this.create(callback);
    }
	};

	window.QuizModel.prototype.fetchQuestions = function(callback) {
		QuestionModel.fetch(this.quizId, function(questions) {
			this.questionModels = questions;
			callback(questions);
		}.bind(this));
	};

	window.QuizModel.prototype.getTitle = function() {
		return this.title;
	};

	window.QuizModel.prototype.getQuestions = function() {
		return this.questionModels;
	};
})();

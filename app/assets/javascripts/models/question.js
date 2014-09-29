(function() {
  /*
   * Create a QuestionModel with the given properties
   */
  window.QuestionModel = function(data) {
    this.question       = data.question;
    this.questionType   = data.question_type;
    this.timesAnswered  = data.times_answered;
    this.correctAnswers = data.correct_answers;
    this.id             = data.id;
    this.choices        = data.choices;
  };

  /*
   * This will fetch all of the questions associated
   * with the given quiz id. The callback is called
   * with models, not raw data.
   */
  window.QuestionModel.fetch = function(quizId, callback) {
    $.ajax({
      url: '/quizzes/' + quizId + '/questions',
      type: 'GET',
      success: function(quizQuestions) {
        var result = [];
        for (var i = 0; i < quizQuestions.length; i++) {
          result.push(new QuestionModel(quizQuestions[i]));
        }
        callback(result);
      }
    });
  };

  /*
   * This will create a new Question in the database
   * and return the new Question's data
   */
  window.QuestionModel.prototype.create = function(callback) {
    $.ajax({
      url: '/quizzes/' + this.quizId + '/questions',
      type: 'POST',
      success: function(quizQuestion) {
        callback(new QuestionModel(quizQuestion));
      }
    });
  };

  /*
   * This will update a given question model with the new
   * information.
   */
  window.QuestionModel.prototype.update = function(callback) {
    $.ajax({
      url: '/quizzes/' + this.quizId + '/questions/' + this.id,
      type: 'PATCH',
      success: function(quizQuestion) {
        callback(new QuestionModel(quizQuestion));
      }
    });
  };

  /*
   * This will determine whether to call update or create
   */
  window.QuestionModel.prototype.save = function(callback) {
    if (this.id) {
      this.update(callback);
    } else {
      this.create(callback);
    }
  };

  /*
   * This method will check if the answer choice selected
   * is accurate or not, and then return data confirming.
   *
   * This requires a given quizId and a questionId
   */
  window.QuestionModel.checkAnswer = function(quizId, questionId, answerChoice, callback) {
    $.ajax({
      url: '/quizzes/' + quizId + '/questions/' + questionId + '/check',
      type: 'GET',
      data: {answer: answerChoice},
      success: function(data) {
        callback(data.correct);
      }
    });
  };

  /*
   * Similar to QuestionModel.checkAnswer except a prototype method
   */
  window.QuestionModel.prototype.checkAnswer = function(answerChoice, callback) {
    QuestionModel.checkAnswer(this.quizId, this.id, answerChoice, callback);
  };
})();
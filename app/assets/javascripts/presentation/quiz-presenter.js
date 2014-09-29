(function () {

  window.Quizzy = window.Quizzy || {};

  Quizzy.QuizPresenter = function ($view, quizzes) {
    var currentQuiz = undefined;

    this.start = function() {
      QuizModel.fetch((function(quizModels) {
        this.quizzes = quizModels;
        this.showQuizzes();
      }).bind(this));
    };

    this.showQuizzes = function() {
      this.quizList = new QuizListView(this.quizzes, 'body');
    };

    this.hideQuizList = function() {
      this.quizList.hide();
    };

    this.showQuiz = function(id) {
      for (var i in this.quizzes) {
        if (this.quizzes[i].id == id) {
          this.currentQuiz = this.quizzes[i];
          break;
        }
      }

      QuestionModel.fetch(this.currentQuiz.id, function(questions) {
        this.hideQuizList();
        this.currentQuiz.questionModels = questions;
        this.correctAnswers = 0;
        this.totalAnswers = questions.length;
        this.quizView = new QuizView(this.currentQuiz.getTitle(), this.currentQuiz.id, $view);
        this.quizView.createQuestionViews(this.currentQuiz.getQuestions());
        this.quizView.showFirstQuestion();
      }.bind(this));
    };

    this.checkAnswer = function(quizId, questionId, answer, callback) {
      QuestionModel.checkAnswer(quizId, questionId, answer, (function(correct){
        if (correct) {
          this.correctAnswers++;
        }
        callback(correct);
      }).bind(this));
    };

    this.getScore = function() {
      var percentage = undefined;
      if (this.correctAnswers == 0) {
        percentage = "0%";
      } else {
        percentage = parseInt((this.correctAnswers / this.totalAnswers) * 100) + "%";
      }
      return {
        percentage: percentage,
        correct: this.correctAnswers,
        total: this.totalAnswers
      };
    };

    this.start();
  };

})();

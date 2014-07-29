(function () {

  window.Quizzy = window.Quizzy || {};

  Quizzy.QuizPresenter = function ($view, quizzes) {
    var me = this;
    var currentQuiz = undefined;
    var $startForm = $('form.start', $view);
    var $questionForm = $('form.quiz-question', $view);
    var $finalResults = $('.final-results', $view);

    $startForm.on('submit', function(e) {
      e.preventDefault();

      currentQuiz = new Quizzy.Quiz(questions, this.playerName.value);

      $startForm.hide();
      displayNextQuestion();
    });

    this.getQuestionsForQuiz = function(quizId, callback) {
      $.ajax({
        url: '/quizzes/' + quizId + '/questions',
        type: 'GET',
        success: function(quizQuestions) {
          callback(quizQuestions);
        }
      })
    };

    this.getQuizzes = function(callback) {
      $.ajax({
        url: '/quizzes',
        type: 'GET',
        success: function(quizData) {
          callback(quizData);
        }
      });
    };

    this.checkAnswer = function(quizId, questionId, answer, callback) {
      var me = this;
      $.ajax({
        url: '/quizzes/' + quizId + '/questions/' + questionId + '/check?answer=' + answer,
        success: function(data) {
          if (data.correct) {
            me.correctAnswers++;
          }
          callback(data.correct);
        }
      });
    };

    this.start = function() {
      this.getQuizzes(this.generateQuizModels.bind(this));
    };

    this.generateQuizModels = function(quizData) {
      this.quizzes = [];
      for (var i in quizData) {
        this.quizzes.push(new QuizModel(quizData[i]));
      }
      this.showQuizzes();
    };

    this.hideQuizList = function() {
      this.quizList.hide();
    };

    this.showQuizzes = function() {
      this.quizList = new QuizListView(this.quizzes, 'body');
    };

    this.getScore = function() {
      var percentage = undefined;
      if (this.correctAnswers == 0) {
        percentage = "0%";
      } else {
        percentage = parseInt((this.totalAnswers / this.correctAnswers) * 100) + "%";
      }
      return {
        percentage: percentage,
        correct: this.correctAnswers,
        total: this.totalAnswers
      };
    };

    this.showQuiz = function(id) {
      for (var i in this.quizzes) {
        if (this.quizzes[i].id == id) {
          this.currentQuiz = this.quizzes[i];
          break;
        }
      }

      this.getQuestionsForQuiz(id, function(quizQuestions) {
        me.hideQuizList();
        me.currentQuiz.generateQuestionModels(quizQuestions);
        me.correctAnswers = 0;
        me.totalAnswers   = me.currentQuiz.questionModels.length;
        me.quizView = new QuizView(me.currentQuiz.getTitle(), me.currentQuiz.id, $view);
        me.quizView.createQuestionViews(me.currentQuiz.getQuestions());
        me.quizView.showFirstQuestion();
      });
    };

    this.start();
  };

})();

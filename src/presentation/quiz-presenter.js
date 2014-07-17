(function () {

  window.Quizzy = window.Quizzy || {};

  Quizzy.QuizPresenter = function ($view, questions) {

    var $startForm = $('form.start', $view);
    var $questionForm = $('form.quiz-question', $view);
    var $finalResults = $('.final-results', $view);
    var quiz;

    $startForm.on('submit', function(e) {
      e.preventDefault();

      quiz = new Quizzy.Quiz(questions, this.playerName.value);

      $startForm.hide();
      displayNextQuestion();
    });

    $questionForm.on('submit', function(e) {
      e.preventDefault();
      var answer = $('input[name=answer]:checked', this).val();
      var result = quiz.submitAnswer( parseInt(answer) );

      var responseText = null;
      if (result.isCorrect) {
        responseText = "Correct!";
      }
      else {
        responseText = "The correct answer is: " + result.answerText;
      }
      $('.answered label', this).text(responseText);

      // Show results
      $('.awaiting-answer', this).hide();
      $('.answered', this).show();
    });

    $('.answered button', $questionForm).on('click', function(e) {
      e.preventDefault();

      if ( quiz.isDone() ) {
        displayFinalResults();
      }
      else {
        displayNextQuestion();
      }
    });


    var displayNextQuestion = function () {
      var question = quiz.getCurrentQuestion();

      // Show question content
      $('.content', $questionForm).text(question.content);

      // Build and show options
      var optionsHtml = "";
      for (var i = 0; i < question.options.length; i += 1) {
        optionsHtml += '<input type="radio" name="answer" value="' + i + '">' + question.options[i] + '<br />';
      }
      $('.options', $questionForm).html(optionsHtml);

      // Show question form
      $('.answered', $questionForm).hide();
      $('.awaiting-answer', $questionForm).show();
      $questionForm.show();
    };

    var displayFinalResults = function () {
      $questionForm.hide();

      var scoreText = quiz.playerName + "'s score: " + quiz.getScore() + " / " + quiz.getTotalQuestionCount();
      $('.score', $finalResults).text(scoreText);

      $finalResults.show();
    };

  };

})();

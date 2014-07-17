(function () {
  window.Quizzy = window.Quizzy || {};

  Quizzy.Quiz = function (questions, playerName) {
    this.playerName = playerName;

    this.answers = [];

    var score = 0;
    var currentQuestionIndex = 0;

    this.getCurrentQuestion = function () {
      return questions[currentQuestionIndex];
    };

    this.submitAnswer = function (answerIndex) {
      var question = this.getCurrentQuestion();
      var result = {
        isCorrect: question.answerIndex === answerIndex,
        answer: question.answerIndex,
        answerText: question.options[question.answerIndex]
      };

      if (result.isCorrect) score += 1;

      this.answers.push(answerIndex);
      currentQuestionIndex += 1;

      return result;
    };

    this.getTotalQuestionCount = function () {
      return questions.length;
    };

    this.getScore = function () {
      return score;
    };

    this.isDone = function () {
      return currentQuestionIndex >= questions.length;
    };
  };

})();

(function () {
  window.Quizzy = window.Quizzy || {};

  Quizzy.Quiz = function (questions, playerName) {
    this.playerName = playerName;

    this.answers = [];

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

      this.answers.push(answerIndex);
      currentQuestionIndex += 1;

      return result;
    };

    this.isDone = function () {
      return currentQuestionIndex >= questions.length;
    };
  };

})();

describe("Quiz", function() {
  var quiz;
  var questions = [
    {
      content: "How old are you?",
      options: [ "60", "80", "120", "None of the above" ],
      answerIndex: 3
    },
    {
      content: "What is your favorite color?",
      options: [ "red", "green", "orange", "apple" ],
      answerIndex: 2
    }
  ];

  beforeEach(function () {
    quiz = new Quizzy.Quiz(questions, "Bob");
  });

  describe("#initialize", function () {
    it("has a player name", function() {
      expect(quiz.playerName).toEqual("Bob");
    });

    it("has a current question", function() {
      expect( quiz.getCurrentQuestion() ).toEqual(questions[0]);
    });

    it("has an empty set of answers", function() {
      expect(quiz.answers.length).toEqual(0);
    });

    it("has a score of zero", function() {
      expect(quiz.getScore()).toEqual(0);
    });

    it("is not done", function() {
      expect(quiz.isDone()).toEqual(false);
    });
  });

  describe("#submitAnswer", function () {
    var result;

    beforeEach(function () {
      // The 4th option (index 3) is the correct answer
      result = quiz.submitAnswer(3);
    });

    it("returns the result", function() {
      expect(result.isCorrect).toEqual(true);
      expect(result.answer).toEqual(3);
      expect(result.answerText).toEqual("None of the above");
    });

    it("moves to the next question", function() {
      expect( quiz.getCurrentQuestion() ).toEqual(questions[1]);
    });

    it("records the answer", function() {
      expect(quiz.answers.length).toEqual(1);
      expect(quiz.answers[0]).toEqual(3);
    });
  });

  describe("#getScore", function () {
    it("increases score for a correct answer", function() {
      quiz.submitAnswer(3);
      expect(quiz.getScore()).toEqual(1);
    });

    it("does not increase score for an incorrect answer", function() {
      quiz.submitAnswer(0);
      expect(quiz.getScore()).toEqual(0);
    });
  });

  describe("#isDone", function () {
    it("is not done after a single submit", function() {
      expect(quiz.isDone()).toEqual(false);
      quiz.submitAnswer(0);
      expect(quiz.isDone()).toEqual(false);
    });

    it("is done after all questions have been answered", function() {
      quiz.submitAnswer(0);
      quiz.submitAnswer(0);
      expect(quiz.isDone()).toEqual(true);
    });
  });

});

describe("Quiz", function() {
  var quiz;
  var questions = [
    {
      question: "How old are you?",
      options: [ "60", "80", "120", "None of the above" ],
      answerIndex: 3
    },
    {
      question: "What is your favorite color?",
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
    });

    it("moves to the next question", function() {
      expect( quiz.getCurrentQuestion() ).toEqual(questions[1]);
    });

    it("records the answer", function() {
      expect(quiz.answers.length).toEqual(1);
      expect(quiz.answers[0]).toEqual(3);
    });
  });

});

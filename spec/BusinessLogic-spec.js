describe("BusinessLogic ....................", function () {

  describe("validateInputForConstraints", function () {
    it('returns true if the input is a number between 1 and 100', function() {
      var guessNum = 58;
      var result = bl.validateInputForConstraints(guessNum);
      expect(result).toEqual(true);
    });
    it('returns false if the input is not a number', function() {
      var guessNum = 'clay';
      var result = bl.validateInputForConstraints(guessNum);
      expect(result).toEqual(false);
    });
    it('returns false if the number is 0', function() {
      var guessNum = 0;
      var result = bl.validateInputForConstraints(guessNum);
      expect(result).toEqual(false);
    });
    it('returns false if the number is a negavitive number', function() {
      var guessNum = -10;
      var result = bl.validateInputForConstraints(guessNum);
      expect(result).toEqual(false);
    });
    it('returns false if the number is a number over 100', function() {
      var guessNum = 158;
      var result = bl.validateInputForConstraints(guessNum);
      expect(result).toEqual(false);
    });
  });

  describe("numberEvaluator", function () {
    bl.secretNumber = 43;
    it('returns "message1" if the guess is greater than the secretNumber', function() {
      var guessNum = 61;
      var result = bl.numberEvaluator(guessNum);
      expect(result).toEqual("message1");
    });
    it('returns "message2" if the guess is less than the secretNumber', function() {
      var guessNum = 22;
      var result = bl.numberEvaluator(guessNum);
      expect(result).toEqual("message2");
    });
    it('returns "true" if the guess equals the secretNumber', function() {
      var guessNum = 43;
      var result = bl.numberEvaluator(guessNum);
      expect(result).toEqual(true);
    });
    it('returns "error1" if the number fails the validateInputForConstraints', function() {
      var guessNum = "stewart";
      var result = bl.numberEvaluator(guessNum);
      expect(result).toEqual("error1");
    });
  });


});

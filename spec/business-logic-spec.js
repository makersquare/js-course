describe("BusinessLogic ....................", function() {

  describe ("setSecretNumber", function() {
    it ("returns a number between 1 and 100", function() {
      var result = logic.setSecretNumber();
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(101);
    });
  });

  describe ("setLandmineNumbers", function() {
    it ("returns an array with three numbers between 1 and 100", function(){
      var result = logic.setLandmineNumbers();
      expect(typeof result).toBe("object");
      expect(result.length).toEqual(3);
      
      result = result[0]
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(101);
    });
  });

  describe ("checkLandmineNumbers", function() {
    it ('returns "warning" message if guess is within 5 of landmine', function() {
      var array = [25, 33, 18];
      var guess = 28;
      var result = logic.checkLandmineNumbers(guess, array).message;
      expect(result).toEqual("warning");
    });

    it ('returns "extremeWarning" message if guess is within 1 of landmine', function() {
      var array = [25, 33, 18];
      var guess = 34;
      var result = logic.checkLandmineNumbers(guess, array).message;
      expect(result).toEqual("extremeWarning");
    });

    it ('returns "gameOver" message if guess is landmine', function() {
      var array = [25, 33, 18];
      var guess = 18;
      var result = logic.checkLandmineNumbers(guess, array).message;
      expect(result).toEqual("gameOver");
    });

    it ('returns "noProblem" message if guess is further than 5 away', function() {
      var array = [25, 33, 18];
      var guess = 99;
      var result = logic.checkLandmineNumbers(guess, array).message;
      expect(result).toEqual("noProblem");
    });

    it ('returns the index of the nearest landmine', function() {
      var array = [25, 33, 18];
      var guess = 45;
      var result = logic.checkLandmineNumbers(guess, array).ind;
      expect(result).toEqual(1);
    });
  });


  describe ("checkGuessVsSecret", function() {
    it ('returns "tooHighMessage" if the guess is bigger than the secret number', function() {
      var result = logic.checkGuessVsSecret(55, 45);
      expect(result).toEqual("tooHighMessage");
    });

    it ('returns "tooLowMessage" if the guess if smaller than the secret number', function () {
      var result = logic.checkGuessVsSecret(20, 98);
      expect(result).toEqual("tooLowMessage");
    });

    it ('returns "successMessage" if the guess if equal to the secret number', function () {
      var result = logic.checkGuessVsSecret(74, 74);
      expect(result).toEqual("successMessage");
    });

    it ('returns "incorrectEntry" if the user inputs something other than an integer', function () {
      var stringEntry = parseInt("eighty-six")
      var result = logic.checkGuessVsSecret(stringEntry, 85);
      expect(result).toEqual("incorrectEntry");
    });

    it ('returns "incorrectEntry" if the user inputs a number over 100', function () {
      var result = logic.checkGuessVsSecret(105, 85);
      expect(result).toEqual("incorrectEntry");
    });

    it ('returns "incorrectEntry" if the user inputs 0', function () {
      var result = logic.checkGuessVsSecret(0, 85);
      expect(result).toEqual("incorrectEntry");
    });

    it ('returns "incorrectEntry" if the user inputs a negative number', function () {
      var result = logic.checkGuessVsSecret(-5, 85);
      expect(result).toEqual("incorrectEntry");
    });


  });

  describe ("checkValidEntry", function() {
    it ("returns false if the entry is not a number", function () {
      var stringEntry = parseInt("blue");
      var result = (logic.checkValidEntry(stringEntry));
      expect(result).toBe(false);
    });
  });

}); //end BusinessLogic test
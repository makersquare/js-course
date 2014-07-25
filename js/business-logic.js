(function() {
  var secretNumber;
  var landmineNumber = [];
  var closestMine;

  function genNums() {
    secretNumber = parseInt(Math.random() * 100, 10) + 1;
    landmineNumber[0] = parseInt(Math.random() * 100, 10) + 1;
    landmineNumber[1] = parseInt(Math.random() * 100, 10) + 1;
    landmineNumber[2] = parseInt(Math.random() * 100, 10) + 1;
    console.log("secret: " + secretNumber + " landmine: " + landmineNumber);
    for (var i =0; i < landmineNumber.length; ++i) {
      if (secretNumber === landmineNumber[i]) {
      genNums() }
    }
  }
  function numDiff() {
    closestMine = undefined
    // console.log("landmine numbers: " + landmineNumber);
    $.each(landmineNumber, function(index, value) {
      if (closestMine === undefined || Math.abs(value - guess) < Math.abs(closestMine - guess)) {
        closestMine = value
      }
    });
    closestMine = Math.abs(closestMine - guess)
    return closestMine
    // console.log(closestMine);
  }

  function guessNum() {
      
    if ($.inArray(guess, landmineNumber) > -1) {
      // $('#response').html("Oops! You hit a landmine! <strong>BOOM!</strong>");
      genNums();
      return "youBoom";
    } else if (guess > secretNumber) {
      numDiff();
      return "lowerMessage";
      // $('#response').text("Nope! The secret number is lower; try again! Be careful, there is a landmine " + closestMine + " places away from your last guess!");
    } else if (guess < secretNumber) {
      numDiff();
      return "higherMessage";
        // $('#response').text("Nope! The secret number is higher; try again! Be careful, there is a landmine " + closestMine  + " places away from your last guess!");
    } else { 
      // $('#response').text("You guessed the secret number! You win!"); 
      genNums();
    };
  }

  genNums();

  window.playGame = guessNum
  window.minesNum = numDiff

})();
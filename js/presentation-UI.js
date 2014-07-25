(function(){
  window.guess;

  $('#submit-button').on('click', function (e) {
    guess = +$('#user-input').val();
    // playGame();
    $('#user-input').val("");

    var response = playGame();
    var mines = minesNum();

    if (response === "youBoom") {
      $('#response').html("Oops! You hit a landmine! <strong>BOOM!</strong>");
    } else if (response === "lowerMessage") {
      $('#response').text("Nope! The secret number is lower; try again! Be careful, there is a landmine " + mines + " places away from your last guess!");
    } else if (response === "higherMessage") {
      $('#response').text("Nope! The secret number is higher; try again! Be careful, there is a landmine " + mines  + " places away from your last guess!");
    } else {
      $('#response').text("You guessed the secret number! You win!"); 
    }
  
    
    });


})();
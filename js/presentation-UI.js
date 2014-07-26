(function() {
	var Presentation = function() {
		var secretNumber;
		var landmineArray;
		var $form = $('form');
  		var $feedback_text = $('#feedback_text');
  		var $feedback = $('#feedback');
  		var $landmineDiv = $("#landmineDiv");
  		var $landmine = $(".landmine")
  		var $landmine1 = $("#landmine1");
  		var $landmine2 = $("#landmine2");
  		var $landmine3 = $("#landmine3");
  		var $guess = $('#guess');
  		var $start_button = $('#start-button')
  		var $submit_button = $('#submit-button')

		var feedbackMessage = function(currentGuess) {
			var message = logic.checkGuessVsSecret(currentGuess, secretNumber);
			if (message === "successMessage") {
				$start_button.show();
				$form.hide();
				$landmineDiv.hide();
				return "Congrats! You got the correct number!";
			} else if (message === "tooHighMessage") {
				return "Your guess is too high! Guess again.";
			} else if (message === "tooLowMessage") {
				return "Your guess is too low! Guess again.";
			} else if (message === "incorrectEntry") {
				return "Try again. Your entry was invalid. Please enter a number between 1 and 100.";
			};
		};

		var landmineFeedback = function(currentGuess) {
			$landmine.removeClass("warning alert").addClass("success");
			var landmineData = logic.checkLandmineNumbers(currentGuess, landmineArray);
			var selector = function() {
				if (landmineData.ind === 0) {
					return $landmine1;
				} else if (landmineData.ind === 1) {
					return $landmine2;
				} else if (landmineData.ind === 2) {
					return $landmine3;
				};
			}();
			if (landmineData.message === "gameOver") {
				$form.hide();
				$start_button.show();
				$feedback_text.text("GAME OVER! You stepped on a landmine!")
				selector.removeClass("warning success").addClass("alert");
				return false;
			} else if (landmineData.message === "extremeWarning") {
				selector.removeClass("warning success").addClass("alert");
				return true;
			} else if (landmineData.message === "warning") {
				selector.removeClass("alert success").addClass("warning");
				return true;
			} else {
				return true;
			};
		};

		$submit_button.on('click', function(e) {	
			var currentGuess = +$guess.val();
		    $landmineDiv.show();
		    e.preventDefault();
			if (landmineFeedback(currentGuess) === true) {
				$feedback_text.text(feedbackMessage(currentGuess));
			};
		    $feedback.show();
		    $guess.val('')
		});


		$start_button.on('click', function() {	
		    secretNumber = logic.setSecretNumber();
		    landmineArray = logic.setLandmineNumbers();
		    console.log("Secret number: " + secretNumber);
		    console.log("Landmine numbers: " + landmineArray);
		    $form.show();
		    $feedback.hide();
		    $start_button.hide();
		    $landmineDiv.hide();
		});	
	};//close Presentation
	window.presentation = Presentation;
	presentation();
})();
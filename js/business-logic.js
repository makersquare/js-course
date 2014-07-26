(function () {
	var BusinessLogic = function() {

		this.setSecretNumber = function () {
  			return parseInt(Math.random() * 100, 10) + 1;
		};

		this.setLandmineNumbers = function() {
			var landmineArray = [];
			for (var i = 0; i < 3; i++) {
      			landmineArray[i] = parseInt(Math.random() * 100, 10) + 1; 
    		};
    		return landmineArray;
		};

		this.checkValidEntry = function (currentGuess) {
			if (isNaN(currentGuess)) {
				return false;
			} else if (currentGuess < 1 || currentGuess > 100) {
				return false;
			} else {
				return true;
			};
		};

		this.nearestLandmine = function (guess, landmineArray){
		    var nearestLandmineNumber;
		    var savedIndex;
		    var smallestDistance = 100;
		    for (var i = 0; i < landmineArray.length; i++) {
		      var distance = Math.abs(guess - landmineArray[i]); 
		      if (distance < smallestDistance) {
		        smallestDistance = distance;
		        nearestLandmineNumber = landmineArray[i];
		        savedIndex = i;
		      };
		    }; 
		    return {
		    	landmineNumber: nearestLandmineNumber,
		    	ind: savedIndex
		    };
		  };

		this.checkLandmineNumbers = function (currentGuess, landmineArray) {
		    var nearestLandmine = this.nearestLandmine(currentGuess, landmineArray);
		    var landmineNumber = nearestLandmine.landmineNumber;
		    var i = nearestLandmine.ind;
		    var distance = Math.abs(currentGuess - landmineNumber);    
		    var message;
		      if (distance === 0) {
		      	message = "gameOver";
		      } else if (distance === 1) {
		        message = "extremeWarning";					      	
		      }  else if (distance <= 5) {
		      	message = "warning";
		      } else {
		      	message = "noProblem"
		      };
		     return {message: message, ind: i};
		};
	

		this.checkGuessVsSecret = function (currentGuess, secretNumber) {
			if (this.checkValidEntry(currentGuess) === false) {
				return "incorrectEntry";
			} else if (currentGuess == secretNumber) {
		    	return "successMessage";
		    } else if (currentGuess > secretNumber) {
		    	return 'tooHighMessage';
		  	} else if (currentGuess < secretNumber) {
		  		return 'tooLowMessage';
		  	};
		}; // end checkGuessVsSecret


	}; // end Logic

	window.logic = new BusinessLogic();
})(); //end anonymous function
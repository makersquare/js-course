(function(){
	var Logic = function() {

		this.claimReservation = function(name) {
		  var message;
		  if (reservations[name] && !reservations[name]['claimed']) {
		  	reservations[name]['claimed'] = true;
		  	
		  	message = "Welcome!";
		  } else if (reservations[name] && reservations[name]['claimed']) {
		  	message = "It appears this reservation has already been claimed.  Maybe somebody from your party has already arrived.  Would you like to look around?";
		  } else {
		  	message ="We do not have a reservation listed for you.  Is it under a different name?";
		  };
		  return message;
		};

		this.makeReservation = function(name) {
			var message;
			if (reservations[name] && !reservations[name]['claimed']) {
				message = "There is already a reservation under that name.  Is there another name we can reserve it under?";
			} else {
				reservations[name] = {claimed: false};
				message = "We have created a reservation for you.";
			};
  			return message;
		};

	};

	window.logic = new Logic();

})();
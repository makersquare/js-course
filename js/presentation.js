(function(){
	var Presentation = function() {
		var $claim = $('#claim');
		var $claimname = $('#claim-name');
		var $claimfeedback = $('#claim-feedback');
		var $reserve = $('#reserve');
		var $reservefeedback = $('#reserve-feedback');
		var $reservename = $('#reserve-name');
		var $list = $('#reservationslist');
		var $update = $('#update')
		
		this.template = function(){ 
			var template = _.template($( ".template" ).html());
			$list.append(template);
		};

		$claim.submit( function (e) {
			e.preventDefault();
			$reservefeedback.hide();
			$claimfeedback.hide();
			var name = $claimname.val();
			var message = logic.claimReservation(name);
			$claimfeedback.text(message);
			setTimeout(function() {
				$claimfeedback.show();
     		}, 300);
		});

		$reserve.submit( function (e) {
			e.preventDefault();
			$reservefeedback.hide();
			$claimfeedback.hide();
			var name = $reservename.val();
			var message = logic.makeReservation(name);
			$reservefeedback.text(message);
			setTimeout(function() {
				$reservefeedback.show();
     		}, 300);
		});

		$update.on('click', function(){
			$list.html(" ");
			presentation.template();
		});
		



	};

	window.presentation = new Presentation();
	presentation.template();

})();
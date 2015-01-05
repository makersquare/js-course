$(document).ready(function (){

	$('.start').on('click',function(){
		resetBoard();
	});

	$('.col').on('click',function(){
		var col = this.className;
		var colx = col.slice(-1);
		var row = $(this).parent('span').attr("class");
		var rowx = row.slice(-1);
		selectSquare(rowx,colx);
		// $(this).addClass('clicked');
	});


	$(document).on('boardChange', function(){
		displayBoard(); //just for console
		for (var i = 0; i < board.length; i++) { //iterate rows
		 for (var j = 0; j < 8; j++){ //iterate cols
			var row = ".row-" + numToChar[i];
		 	var col = ".col-" + String(j);
		 	$(row).find(col).empty();
		 	$(row).find(col).removeClass("clicked");
		 	// if (board[i][j] === " X "){		 	
		 	// }
		 	if (board[i][j] === "wht"){		 	 
		 	  var div = $('<div>').addClass('white piece');
		 	  $(row).find(col).append(div);
		 	}
		 	else if (board[i][j] === "red"){		 
		 	  var div = $('<div>').addClass('red piece');
		 	  $(row).find(col).append(div);
		 	}
		 }//end cols
		}//end rows
		$('.infobox').empty();
		if (currentPlayer === 'wht'){
			$('.infobox').text("Current player: White")
		}
		else {
			$('.infobox').text("Current player: Red")
		}
		$('.infobox').append('<br>Turns taken: ', turns)
	});

	$(document).on('invalidMove',function(e, error){
		alert(error);
	})

	$(document).on('pieceTaken', function(e, player, row, col){
		if (player === 'wht'){
		alert("White captured a red piece!")
		}
		else {
		alert("Red captured a white piece!")
		}
	})

});
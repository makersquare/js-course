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
	});

	$(document).on('boardChange', function(){
		displayBoard(); //just for console
		for (var i = 0; i < board.length; i++) { //iterate rows
		 for (var j = 0; j < 8; j++){ //iterate cols
		 	var row = ".row-" + numToChar[i];
		 	var col = ".col-" + String(j);
		 	if (board[i][j] === " X "){
		 	  $(row).find(col).empty();
		 	}
		 	else if (board[i][j] === "wht"){
		 	  $(row).find(col).empty();
		 	  var div = $('<div>').addClass('white piece');
		 	  $(row).find(col).append(div);
		 	}
		 	else if (board[i][j] === "red"){
		 	  $(row).find(col).empty();
		 	  var div = $('<div>').addClass('red piece');
		 	  $(row).find(col).append(div);
		 	}
		 }//end cols
		}//end rows
	});

	$(document).on('invalidMove',function(error){
		alert(error);
	})

	$(document).on('pieceTaken', function(player, enemy, row, col){
		alert("Haha, you lost a piece!")
	})

});
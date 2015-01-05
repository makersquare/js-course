var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    console.log(numToChar[i] + " |" + board[i].join(" "));
  }
};

var getMove = function (){
  var move = prompt("Enter the row and colum numbers of your current piece position and the new position:")
  if (move[0] === "q"){
    return "q"
  }
  else{
  var bits = move.split(",")
  var coords = {"r1": bits[0],
                "c1": bits[1],
                "r2": bits[2],
                "c2": bits[3]};
  return coords;
  }
};

var play = function() {
  resetBoard();
  var gaming = true;
  while (gaming === true){
    var move = getMove();
    if (move === "q"){    
      gaming = false;
    }
    else{
    console.log("got coords:", move);
    attemptMove(move["r1"],move["c1"],move["r2"],move["c2"]);
    }
  }  
};
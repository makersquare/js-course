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

var displayError = function (e, error) {
  console.log(error);
};

var play = function () {
  Checkers.resetBoard();

  while (true) {
    var move = getMove();
    if (move.quit) {
      break;
    }
    Checkers.attemptMove(move.startRow, move.startCol, move.endRow, move.endCol);
  }
}

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < Checkers.board.length; i++) {
    console.log(numToChar[i] + " |" + Checkers.board[i].join(" "));
  }
};

var getMove = function () {
  var start = prompt("Pick starting piece position (example: f5)");
  if (start[0] == "q") {
    return {
      quit: true
    }
  }
  var end = prompt("Pick ending position");
  start = start.split("")
  end = end.split("")
  return {
    startRow: charToNum[start[0]],
    startCol: Number(start[1]),
    endRow: charToNum[end[0]],
    endCol: Number(end[1])
  }
};

var taunt = function () {
  console.log("Piece Taken! HAHA");
}

Checkers.on('invalidMove', displayError);
Checkers.on('boardChange', displayBoard);
Checkers.on('pieceTaken', taunt);

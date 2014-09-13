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

var play = function () {
  resetBoard();
};

var displayBoard = function () {
  for (var rowIndex = 0; rowIndex < board.length; rowIndex++) {
    var row = board[rowIndex];
    for (var colIndex = 0; colIndex < row.length; colIndex++) {
      var rowKey = numToChar[Number(rowIndex)];
      var element = $(".row-" + rowKey).children(".col-" + colIndex);
      displayPiece(element, row[colIndex]);
    }
  }
};

var displayPiece = function (element, piece) {
  element.empty();
  if (piece == 'red') {
    element.append("<span class='red piece'></span>");
  } else if (piece == 'wht') {
    element.append("<span class='white piece'></span>");
  }
};

$(document).on('boardChange', displayBoard);
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
};

var move;

var getMove = function () {
  move = {
    startRow: null,
    startCol: null,
    endRow: null,
    endCol: null
  }
};

var updateMove = function (e) {
  var piece = $(e.currentTarget);
  var row = $('.row').index(piece.parent());
  var col = piece.parent().children().index(piece);
  if (move.startRow == null || move.startCol == null) {
    move.startRow = row;
    move.startCol = col;
    $('.start').empty().append("row: " + row + ", col: " + col);
  } else {
    move.endRow = row;
    move.endCol = col;
    $('.end').empty().append("row: " + row + ", col: " + col);
    Checkers.attemptMove(move.startRow, move.startCol, move.endRow, move.endCol);
    getMove();
  }
};

var play = function () {
  Checkers.resetBoard();
  getMove();
};

var displayBoard = function () {
  for (var rowIndex = 0; rowIndex < Checkers.board.length; rowIndex++) {
    var row = Checkers.board[rowIndex];
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

$(document).on('ready', function() {
  Checkers.on('boardChange', displayBoard);
  Checkers.on('boardChange', getMove);
  $('.col').on('click', updateMove);
  $('.start').on('click', play);
});

var displayError = function (e, error) {
  $('.error').empty().append(error);
};
Checkers.on('invalidMove', displayError);
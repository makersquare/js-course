var board = [
  ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
  [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
  ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
  [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
  [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
  [' X ', 'blk', ' X ', 'blk', ' X ', 'blk', ' X ', 'blk'],
  ['blk', ' X ', 'blk', ' X ', 'blk', ' X ', 'blk', ' X '],
  [' X ', 'blk', ' X ', 'blk', ' X ', 'blk', ' X ', 'blk']
];

var currentPlayer = 'blk';

var attemptMove = function (row1, col1, row2, col2) {
  if (board[row1][col1] == ' X ') {
    $(document).trigger('invalidMove', "What are you trying to move?");
  } elsif (board[row1][col1] != currentPlayer) {
    $(document).trigger('invalidMove', "That's not your piece");
  }

  if (board[row2][col2] != ' X ') {
    $(document).trigger('invalidMove', "There's already a piece at the destination"); 
  }

  var direction = (currentPlayer == 'red') ? 1 : -1;
  var enemy = (currentPlayer == 'red') ? 'blk' : 'red';

  if (row1 + direction == row2 && (col1 + 1 == col2 || col1 - 1 == col2)) {
    makeMove(row1, col1, row2, col2);
  } else if (row1 + direction * 2 == row2 &&
      (col1 + 2 == col2 || col1 - 2 == col2)) {
    var midRow = row1 + direction;
    var midCol = col1 + (col2 - col1) / 2;
    if (board[midRow][midCol] == enemy) {
      makeMove(row1, col1, row2, col2);
      removePiece(midRow, midCol);
    } else {
      $(document).trigger('invalidMove', "That's just not a valid move");   
    }
    // call proper methods
  } else {
    $(document).trigger('invalidMove', "That's just not a valid move");
  }
};

var makeMove = function(row1, col1, row2, col2) {
  var piece = board[row1][col1];
  board[row1][col1] = ' X ';
  board[row2][col2] = piece;
  currentPlayer = currentPlayer == 'red' ? 'blk' : 'red';
  $(document).trigger('moveMade', currentPlayer, row1, col1, row2, col2);
}

var removePiece = function(row, col) {
  var enemy = board[row][col];
  board[row][col] = ' X ';
  $(document).trigger('pieceTaken', currentPlayer, enemy, row, col);
}

// Checkers
// Board has changed
// Move has been made
// Piece has been taken
// An invalid move has been attempted
// It is the next player's turn
// A piece has been 'kinged'
// It is game over
// It is stalemate
// There is potential for a double take

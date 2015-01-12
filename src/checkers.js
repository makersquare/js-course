(function () {
  var board, currentPlayer;

  // The public interface
  window.Checkers = observable({})

  Checkers.resetBoard = function () {
    board = Checkers.board = [
      [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
      ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
      [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
      [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
      [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
      ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
      [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
      ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
    ];

    currentPlayer = 'wht'
    Checkers.trigger('boardChange', board);
  }

  Checkers.getCurrentPlayer = function () {
    return currentPlayer;
  }

  Checkers.attemptMove = function (row1, col1, row2, col2) {
    if (board[row1][col1] == ' X ') {
      Checkers.trigger('invalidMove', "What are you trying to move?");
      return false;
    } else if (board[row1][col1] != currentPlayer) {
      Checkers.trigger('invalidMove', "That's not your piece");
      return false;
    }

    if (board[row2][col2] != ' X ') {
      Checkers.trigger('invalidMove', "There's already a piece at the destination");
      return false;
    }

    var direction = (currentPlayer == 'red') ? -1 : 1;

    var enemy = (currentPlayer == 'red') ? 'wht' : 'red';

    if (row1 + direction == row2 && (col1 + 1 == col2 || col1 - 1 == col2)) {
      makeMove(row1, col1, row2, col2);
      return true;
    } else if (row1 + direction * 2 == row2 &&
        (col1 + 2 == col2 || col1 - 2 == col2)) {
      var midRow = row1 + direction;
      var midCol = col1 + (col2 - col1) / 2;
      if (board[midRow][midCol] == enemy) {
        makeMove(row1, col1, row2, col2);
        removePiece(midRow, midCol);
        return true;
      } else {
        Checkers.trigger('invalidMove', "That's just not a valid move");
        return false;
      }
      // call proper methods
    } else {
      Checkers.trigger('invalidMove', "That's just not a valid move");
      return false;
    }
  };

  // Private helper functions
  function makeMove (row1, col1, row2, col2) {
    var piece = board[row1][col1];
    board[row1][col1] = ' X ';
    board[row2][col2] = piece;
    currentPlayer = currentPlayer == 'red' ? 'wht' : 'red';
    Checkers.trigger('boardChange', board);
    Checkers.trigger('moveMade', currentPlayer, row1, col1, row2, col2);
  }

  function removePiece (row, col) {
    var enemy = board[row][col];
    board[row][col] = ' X ';
    Checkers.trigger('boardChange', board);
    Checkers.trigger('pieceTaken', currentPlayer, enemy, row, col);
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


  // Below is a helper function to make an object observable.
  // In a bigger project we would move it into its own file.
  function observable (obj) {
    var callbacks = {}, slice = [].slice;

    obj.on = function(events, fn) {
      if (typeof fn === "function") {
        events.replace(/\S+/g, function(name, pos) {
          (callbacks[name] = callbacks[name] || []).push(fn);
          fn.typed = pos > 0;
        });
      }
      return obj;
    };

    obj.trigger = function(name) {
      var args = slice.call(arguments, 1),
        fns = callbacks[name] || [];

      for (var i = 0, fn; (fn = fns[i]); ++i) {
        if (!fn.busy) {
          fn.busy = true;
          fn.apply(obj, fn.typed ? [name].concat(args) : args);
          if (fn.one) { fns.splice(i, 1); i--; }
          fn.busy = false;
        }
      }
      return obj;
    };
    return obj;
  }
})();

// // // // // // ///
// Board Component //
/// // // // // // //
(function () {
  window.Board = {}

  //
  // In a bigger project we would put the controller in its own file
  //
  Board.controller = function () {
    var ctrl = {
      // The currently selected square
      selectedSquare: m.prop([])
    }
    // This controller constructor function only runs once;
    // this is a good spot to initialize the checkers board.
    Checkers.resetBoard()

    ctrl.onSquareClick = function (i, j) {
      var piece = Checkers.board[i][j]
      var player = Checkers.getCurrentPlayer()
      var selection = ctrl.selectedSquare()

      if (selection.length) {
        // Player is attempting to mave a move
        Checkers.attemptMove(selection[0], selection[1], i, j)
        // Reset selection
        ctrl.selectedSquare([])
      }
      else {
        // Player is attempting to select a piece
        if (piece === 'red' && player === 'red' || piece === 'wht' && player === 'wht') {
          ctrl.selectedSquare([i,j])
        }
      }
    }
    return ctrl
  }

  //
  // In a bigger project we would put the view in its own file
  //
  Board.view = function (ctrl) {
    return Checkers.board.map(function(row, i) {
      var cycle = i % 2
      return m('span.row', row.map(renderSquare.bind(null, ctrl, cycle, i)) )
    })
  }

  function renderSquare (ctrl, cycle, i, piece, j) {
    // Red/black cycling
    var className = (j % 2 === cycle) ? 'empty' : ''

    // Determine if this square is selected
    var sq = ctrl.selectedSquare()
    if (sq[0] === i && sq[1] === j) {
      className += ' selected'
    }

    // Construct the html element
    return m('span.col', {
      class: className,
      // When this square is clicked, call onSquareClick with the current i and j
      onclick: ctrl.onSquareClick.bind(null, i, j)
    }, renderPiece(piece))
  }

  function renderPiece (piece) {
    // Only return something if there is a piece
    if (piece === 'red' || piece === 'wht') {
      return m('span.piece', { class: piece })
    }
  }
})()

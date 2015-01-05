var board, currentPlayer;

var resetBoard = function () {
  board = [
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
};

var attemptMove = function (row1, col1, row2, col2){
  //if regular move
  if ((charToNum[row2] - charToNum[row1] === 1) || (charToNum[row2] - charToNum[row1] === -1)){
    var validcola = String(parseInt(col1)+1)
    var validcolb = String(parseInt(col1)-1)
    var spaceval = board[charToNum[row2]][col2]
    if ((col2 === validcola || col2 === validcolb) && (spaceval === " X ")){
      console.log("valid move")
      makeMove(row1, col1, row2, col2)
    }
  }
  //if capture in pos direction
  else if (charToNum[row2] - charToNum[row1] === 2) {
    var validcola = String(parseInt(col1)+2)
    var validcolb = String(parseInt(col1)-2)
    var spaceval = board[charToNum[row2]][col2]
    var cappiecea = board[charToNum[row1]+1][String(parseInt(col1)+1)]
    var cappieceb = board[charToNum[row1]+1][String(parseInt(col1)-1)]
    //if capture to the right
    if ((col2 === validcola ) && (spaceval === " X ") && (cappiecea != " X ")){
      console.log("valid move")
      removePiece(numToChar[charToNum[row1]+1], parseInt(col1)+1)
      makeMove(row1, col1, row2, col2)
   
       }
    //if capture to the left
    else if ((col2 === validcolb) && (spaceval === " X ") && (cappieceb != " X ")){
      console.log("valid move")
      removePiece(numToChar[charToNum[row1]+1], parseInt(col1)-1)
      makeMove(row1, col1, row2, col2)
      }
    }
  //if capture in negative direction
  else if (charToNum[row2] - charToNum[row1] === -2){
    var validcola = String(parseInt(col1)+2)
    var validcolb = String(parseInt(col1)-2)
    var spaceval = board[charToNum[row2]][col2]
    var cappiecea = board[charToNum[row1]-1][String(parseInt(col1)+1)]
    var cappieceb = board[charToNum[row1]-1][String(parseInt(col1)-1)]
    //if capture to the right
    if ((col2 === validcola ) && (spaceval === " X ") && (cappiecea != " X ")){
      console.log("valid move")
      removePiece(numToChar[charToNum[row1]-1], parseInt(col1)+1)
      makeMove(row1, col1, row2, col2)
   
       }
    //if capture to the left
    else if ((col2 === validcolb) && (spaceval === " X ") && (cappieceb != " X ")){
      console.log("valid move")
      removePiece(numToChar[charToNum[row1]-1], parseInt(col1)-1)
      makeMove(row1, col1, row2, col2)
      }
  }

};

var makeMove = function (row1, col1, row2, col2) {
  var piece = board[charToNum[row1]][col1]
  board[charToNum[row2]][col2] = piece
  board[charToNum[row1]][col1] = ' X '
  displayBoard();
};

var removePiece = function (row, col){
  board[charToNum[row]][col] = ' X '
};
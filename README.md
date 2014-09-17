# Goal

The goal of this application is to get a better understanding of how callbacks work. You will be using events/event handlers a lot more than you generally would in a real application. However, it's still important to practice this because it will help you understand the asynchronous nature of JavaScript.

# Set up

```console
$ cd to/some/folder
$ git clone https://github.com/makersquare/js-course checkers-start
$ cd checkers-start
$ git checkout checkers-start
# This updates your remote pointer to point to your own fork
$ git remote rm origin
$ git remote add origin https://github.com/YOUR_GITHUB_USERNAME/js-course
```

The files you should look at include:

* README.md
* index.html
* src/checkers.js
* src/console_driver.js
* css/app.css

# Checkers

Make sure you understand the game of checkers. Your goal is to implement a subset of the features.

At a minimum you will be able to do the following:

* Start a game of checkers with the pieces in the right positions
* Move pieces diagonally
* Capture other pieces by jumping them
* Alerting the user of invalid moves and the reason they're invalid
* Have a user interface for playing this on the console
* Have a user interface for playing this on an HTML page

## The Checkers Engine

If you look at the last two tasks, you'll have to implement 2 separate UIs for this game. Because of this, we'll have to decouple the logic for the game from the UI of the game.

The first part of this is creating the data structures and functions needed to simulate movements. Create a file called `checkers.js` and include it in your index.html file.

Implement the following functions:

* **resetBoard()** - this function should set the `board` variable equal to an array of arrays that represents the board. It will also set the `currentPlayer`
* **attemptMove(row1, col1, row2, col2)** - This will take in a pair of coordinates. The first one represents the starting position of a piece you want to move, and the second one represents the position that you want to move it to. This function will check if the move is valid. If it is, it will execute it; otherwise, it will error out (we'll explain how later).
* **makeMove(row1, col1, row2, col2)** - This will actually execute the movement of the piece. (Helper function called by attemptMove)
* **removePiece(row, col)** - This function will remove the piece at the given coordinate. (Helper function called by attemptMove)

For now, these functions will change the `board` variable to reflect movement. It has no way to actually show an error just yet, so do nothing when there's an error.

---

## Tell the UI that something has changed

In order to tell the UI (a js file that doesn't exist yet) that it needs to update, we're going to use events. For now you'll be triggering these events on the `$(document)` element. Here are the events you need to trigger:

* When the board changes trigger a `boardChange` event and send the board array
* When a piece is taken trigger a `pieceTaken` event and send the currentPlayer, the enemy, the row and column of the piece.
* When someone tries to make an invalid move, trigger an `invalidMove` event and send a message with the error.

---

## Console UI

The first UI we'll work with is going to deal with the prompt and our good ol' `console.log` function.

### Display the board

Use the following JS code to display the board:

```javascript
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

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    console.log(numToChar[i] + " |" + board[i].join(" "));
  }
};
```

Try displaying the board in the console. call `resetBoard` and then display the board again.

### Get the move

Create a function called `getMove` that will prompt the user for a move. Your goal is to parse the user input into coordinate positions that you could throw into the `board` array.

I personally chose to return an object with the following properties:

* startRow
* startCol
* endRow
* endCol

I also chose to return `{quit: true}` if the user typed anything that started with q. This would let me know the user is done playing the game.

### Play the game

Create a function called `play`. This function controls the whole game. It should start off by resetting the board. It should then get the user's move and try making the move using `attemptMove`.

Notice, you should not do anything that requires you to display anything to the screen.

### Show me what you got!

In order to display the board, use an event handler for `boardChange`.

Create an event handler to display an error to the user.

Create an event handler to taunt a user when a piece gets taken.

Create an event handle to display how many turns have occurred.

---

## Let's go to the Web

Things get tricky here because you're no longer dealing with inputs/outputs that you have 100% control of. With `prompt` you know that that when the user types in an input, your function will continue with the next line; however, you can't say the same for when a person must click on a square on the board.

### Display the board

To display the board, you will want to use a combination of iteration, string manipulation, and jQuery to show the right pieces.

For every row on the board, there is a `span` with the class `row-<num>` where `<num>` is the numerical row it is.

Within each row, there are 8 squares that each have the class `col-<num>` which is the numerical column it is.

So square B3 would be row 2, column 3. This would mean their index would be row 1, column 2. I would look for: `$('.row-1').find('.col-2')` to find that piece.

For each square, if there is no piece, you should empty the span.

If there is a red piece, you should give it the classes "red" and "piece". If there is a white piece, you should give it the classes "white" and "piece".

### Creating a solid move

In order to create a move, a person has to click on 2 square; however, jQuery allows you to listen to 1 event at a time.

You'll have to

* Listen to the first click
* Store the information about that click
* Wait for the second click
* Attempt making a move
* Clear previously saved iformation

You will click a single event handler to listen for clicks that will be able to tell whether it's on the first or second click.

### Display the board

Create a click handler for when the board changes.

### Display errors

When the checkers engine triggers the `invalidMove` event, display it on the page. You'll need an event handler and will likely need to edit the HTML, too.

### Gathering moves from clicks

Once the document has loaded, create the click handler for each square on the board.

### Start the game

Also create a click handler for when someone presses the start button. Ideally, you would just have to reset the board.

### Other features

Do each of the following using event handlers

* Add a counter that keeps track of number of games started
* Add a counter for number of moves made
* Add a counter for number of errors made
* Add a counter for number of pieces taken

### Extensions

If you want to truly make this work... mwahahaha

* Add the ability to **double jump**, capturing multiple pieces in 1 turn
* Be able to tell when you've won the game. Edit the engine and the UI for this.
* Be able to **King** your pieces
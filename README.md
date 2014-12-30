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

## The Checkers Engine - Overview

If you look at the last two tasks, you'll have to implement 2 separate UIs for this game. Because of this, we'll have to decouple the logic for the game from the UI of the game.

The first part of this is creating the data structures and functions needed to simulate movements. This will be the `src/checkers.js` file.

This file has the variables `board` and `currentPlayer` and a couple of functions as well. `board` represents the current state of the checkers board. It is a 2D array that you access with the row and column number: `board[1][3]`. This represents row 2 and column 4.

Each spot can either have the value ' X ' to represent and empty spot, 'wht' to represent player1 or `red` to represent player2.

`currentPlayer` represents the player whose turn it is right now.

The function `resetBoard`, sets up the board and the currentPlayer for a brand new game to be played.

`selectSquare` is the function that executes when you're trying to play the game. This is the interesting function that you will have to build out. If you're imagining a web application that has a checkers board, in order to make a move, you have to click on two squares. The first one is to select the piece that you want to move, the second one is the square that you want to move the piece to. `selectSquare` represents each one of those clicks. Here is the spec:

### Select Square Spec

First Move:

* If on your first click, you select an empty spot instead of a checkers piece, you should trigger an error. You once again listen for the first move. **This part is done for you as an example.**
* If on your first click, you select a piece of the wrong color, you should trigger an error. You once again listen for the first move.
* If on your first click, you select your own piece, store the information and start listening for the second move.

Second Move:

* If you click on another piece, trigger an error. This is equivalent to you trying to move on top of another piece which is illegal. Listen for the first move again.
* If you click on an empty spot that's not a legal move, trigger an error and listen for the first move again.
* If you click on a proper spot, update the board and trigger a "boardChange" event. Listen for the first move again.
* If upon clicking on a proper spot, you also take an opponent's piece, update the board, trigger a "boardChange" event, and a "stolenPiece" event.

---

## Tell the UI that something has changed

We're first going to consider how we can play this game on the console. In order to do this, we need to define how the inputs and outputs will look.

Inputs - The only inputs we need from the user is from them selecting a square. Our users will be referring to particular squares by a letter for the column and a number for the row. Create a function called `makeMove` that takes an input of a row letter and a column number and calls `selectSquare` with the respective index. Example:

```javascript
var makeMove = function(letter, number) {
  // call selectSquare
  // if makeMove("c", 6); is called, you should call
  // selectSquare(2, 5);
  // This is because "c" is the 3rd letter which is index 2,
  // and 6 would be index 5.
};
```

Outputs - To show the user any output, we're going to be using `console.log` to print out statements.

To get the outputs working, we first have to know when to print certain statements. For example, we can print the state of the board, but **when** do we print it out? When the file loads? When the game starts?

**You actually print the state of the board whenever the board changes.** We've already built out the `displayBoard` method, execute this function whenever the `boardChange` event occurs.

In order to tell the UI (a js file that doesn't exist yet) that it needs to update, we're going to use events. For now you'll be triggering these events on the `$(document)` element. Here are the events you need to trigger:

* When the board changes trigger a `boardChange` event and send the board array
* When a piece is taken trigger a `pieceTaken` event and send the currentPlayer, the enemy, the row and column of the piece.
* When someone tries to make an invalid move, trigger an `invalidMove` event and send a message with the error.

---

### Show me what you got!

In order to display the board, use an event handler for `boardChange`.

Create an event handler to display an error to the user whenever the `error` event occurs.

Create an event handler to taunt a user when a piece gets taken.

Create an event handle to display how many turns have occurred.

---

## Let's go to the Web

We'll tackle this, just like we tackled the console_driver. This time you'll have to create everything from scratch. Start by considering the inputs and outputs:

Inputs: On the web, the inputs are clicks on the board.

Outputs: The outputs are the HTML/CSS on the board which visually show the user what has changed.

Create a file called `jquery_driver.js` and include it in your `index.html`.

### Inputs

Use a click listener to listen to when a user clicks on the board. Determine the row and column that the user has clicked on, and call the `selectSquare` method.

<aside>
  Figuring out the row and column of the selected square is actually quite difficult. You will have to use a combination of the following tools:

  - `$(e.currentTarget)`: e is the events in the click listener, and currentTarget represents the HTML element selected.
  - The jQuery method `.parent()` and `.children()`. Use the combination of the two.
  - The method `indexOf` for arrays

  Again, this is very difficult. If you're stuck on this for too long, contact a fellow to help.

</aside>

### Ouptuts

This is similar to the console driver, you will still need to have the same event handlers that you had beforehand, but this time you'll display things on the HTML board.

To display the board, you will want to use a combination of iteration, string manipulation, and jQuery to show the right pieces.

For every row on the board, there is a `span` with the class `row-<num>` where `<num>` is the numerical row it is.

Within each row, there are 8 squares that each have the class `col-<num>` which is the numerical column it is.

So square B3 would be row 2, column 3. This would mean their index would be row 1, column 2. I would look for: `$('.row-1').find('.col-2')` to find that piece.

For each square, if there is no piece, you should empty the span.

If there is a red piece, you should give it the classes "red" and "piece". If there is a white piece, you should give it the classes "white" and "piece".

#### Display errors

When the checkers engine triggers the `error` event, display it on the page. You'll need an event handler and will likely need to edit the HTML, too.

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
# Checkers
TypeScript study applied in a checkers game

### Using it
You can compile the game in any way you want using the [Typescript Compiler Options] (https://www.typescriptlang.org/docs/handbook/compiler-options.html).

To initialize the game, import Checkers module and call `Checkers.startGame(selector, player1, player2)`.
* The `selector` param is the element to render the game
* (Optional) `player1` instance of `Models/Player`
* (Optional) `player2` instance of `Models/Player`

Obs:  There is default players. The params is necessary just in case of changing players' names or piece colors

### Examples

There is two examples compiled to [AMD] (http://requirejs.org/) modularization:
* [Using default players] (./examples/default-players.html)
* [Using custom players] (./examples/custom-players.html)

### How to play

* Click on the piece intended to play and then click on the place to move on
* You can cancel combo plays (when you can eat more than one piece in a row) by clicking again on the selected piece

Thank you!

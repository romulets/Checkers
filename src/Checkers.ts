import Board from './Models/Board'
import Player from './Models/Player'

/**
 * Starts a checkers game
 * @param {string} elementSelector The elementSelector to HTML Element
 * @param {string} player1Color The hex color to the player 1 piece
 * @param {string} player2Color The hex color to the player 2 piece
 */
export function startGame(elementSelector : string,
                          player1Color : string,
                          player2Color : string) {
  let player1 = new Player(player1Color)
  let player2 = new Player(player2Color)
  let board = new Board(elementSelector, player1, player2)
}

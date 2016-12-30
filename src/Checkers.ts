import Board from './Models/Board'
import Player from './Models/Player'

/**
 * Starts a checkers game
 * @param {string} elementSelector The elementSelector to HTML Element
 * @param {string} player1 Player1
 * @param {string} player2 Player2
 */
export function startGame(elementSelector : string,
                          player1? : Player,
                          player2? : Player) {
  player1 = player1 || new Player('Player 1', '#1d733c')
  player2 = player2 || new Player('Player 2', '#7d1e1e')
  let board = new Board(elementSelector, player1, player2)
}

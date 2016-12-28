import Board from './Models/Board'
import Player from './Models/Player'

export function init(selector : string, pl1Color : string, pl2Color : string) {
  var player1 = new Player(pl1Color)
  var player2 = new Player(pl2Color)
  var board = new Board(selector, player1, player2)
}

import Place from '../Models/Place'
import { Action } from './Action'
import { BOARD_HEIGHT } from '../consts'

export default class CrownAction implements Action {

  private to : Place

  constructor (to : Place ) {
    this.to = to
  }

  /* Methods */

  public canPerform () : boolean {
      if (this.to.isEmpty()) return false
      var piece = this.to.piece
      var player = piece.player

      console.log(player.moveFoward, piece.X)
      return (player.moveFoward && piece.X === BOARD_HEIGHT - 1) ||
              (!player.moveFoward && piece.X === 0)
  }

  public perform () : boolean {
    console.log("performed")
    this.to.piece.isQueen = true
    return true
  }

}

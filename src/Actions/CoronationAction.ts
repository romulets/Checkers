import Place from '../Models/Place'
import { Action } from './Action'
import { BOARD_HEIGHT } from '../consts'

export default class CoronationAction implements Action {

  private to : Place

  constructor (to : Place ) {
    this.to = to
  }

  /* Methods */

  public canPerform () : boolean {
    let { to } = this
    if (this.doesntNeedSeeCoordinate()) return false

    let { piece } = to
    let { player } = piece
    return (player.moveFoward && piece.X === BOARD_HEIGHT - 1) ||
            (!player.moveFoward && piece.X === 0)
  }

  private doesntNeedSeeCoordinate() {
    let { to } = this
    return to === null || to.isEmpty() || to.piece.isQueen
  }

  public perform () : boolean {
    this.to.piece.isQueen = true
    return true
  }

}

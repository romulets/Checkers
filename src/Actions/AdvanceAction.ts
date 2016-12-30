import Place from '../Models/Place'
import { Action } from './Action'
import PlayResponse from '../Models/PlayResponse'
import { isAdvancingPlace } from './helpers'

export default class AdvanceAction implements Action {

  private from : Place
  private to : Place

  constructor (from : Place, to : Place) {
    this.from = from
    this.to = to
  }

  /* Methods */

  public canPerform () : boolean {
    return isAdvancingPlace(this.from, this.to)
  }

  public perform () : PlayResponse {
    let { from, to } = this
    let piece = from.piece
    to.selected = false
    from.selected = false
    from.piece = null
    to.piece = piece
    return PlayResponse.finished()
  }

}

import Place from '../Models/Place'
import { Action } from './Action'
import PlayAction from './PlayAction'
import PlayResponse from '../Models/PlayResponse'

export default class UnselectAction implements Action {

  private from : Place
  private to : Place
  private lastPlay : PlayAction

  constructor (from : Place, to : Place, lastPlay? : PlayAction) {
    this.from = from
    this.to = to
    this.lastPlay = lastPlay || null
  }

  /* Methods */

  public canPerform () : boolean {
    let { from, to } = this
    return from !== null && from.equalsTo(to)
  }

  public perform () : PlayResponse {
    this.to.selected = false

    if (this.lastPlay != null && this.lastPlay.isComboPlay) {
      return PlayResponse.finished()
    } else {
      return PlayResponse.stillHappening() 
    }
  }

}

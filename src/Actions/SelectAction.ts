
import Place from '../Models/Place'
import { Action } from './Action'
import PlayResponse from '../Models/PlayResponse'

export default class SelectAction implements Action {

  private from : Place
  private to : Place

  constructor (from : Place, to : Place) {
    this.from = from
    this.to = to
  }

  /* Methods */

  public canPerform () : boolean {
    let { from, to } = this
    return from === null && !to.isEmpty()
  }

  public perform () : PlayResponse {
    this.to.selected = true
    return PlayResponse.stillHappening(this.to)
  }

}

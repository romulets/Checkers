import PlayAction from './PlayAction'
import Place from '../Models/Place'
import { Action } from './Action'

export default class UnselectAction implements Action {

  private from : Place
  private to : Place

  constructor (from : Place, to : Place) {
    this.from = from
    this.to = to
  }

  /* Methods */

  public canPerform () : boolean {
    let { from, to } = this
    return from !== null && from.equalsTo(to)
  }

  public perform () : boolean {
    this.to.selected = false
    return true
  }

}

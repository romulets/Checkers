import PlayAction from './PlayAction'
import Place from '../Models/Place'
import { Action } from './Action'

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

  public perform () : boolean {
    this.to.selected = true
    return true
  }

}

import Place from '../Models/Place'
import Piece from '../Models/Piece'
import EatAction from './EatAction'
import AdvanceAction from './AdvanceAction'
import SelectAction from './SelectAction'
import UnselectAction from './UnselectAction'
import CoronationAction from './CoronationAction'
import { Action } from './Action'
import { isEatingAFriendPiece } from './Helpers'

export default class PlayAction implements Action {

  private _from : Place
  private _to : Place
  private _board : Place[][]

  constructor (from : Place, to : Place, board : Place[][]) {
    this._from = from
    this._to = to
    this._board = board
  }

  /* Getters and Setters */

  get from () : Place {
    return this._from
  }

  get to () : Place {
    return this._to
  }

  get board () : Place[][] {
    return this._board
  }

  /* Methods */

  public canPerform () : boolean {
    if (this.to === null) return false
    else if (isEatingAFriendPiece(this.from, this.to)) return false
    else return true
  }


  public perform () : boolean {
    if (!this.canPerform()) return false
    let perfomedSuccessfully = this.performActions()
    this.performAfterActions()
    return perfomedSuccessfully
  }

  private performActions () : boolean {
    let action, i
    let actions = this.getSequencedActionList()

    for (i = 0; i < actions.length; i++) {
      action = actions[i]
      if(action.canPerform()) return action.perform()
    }
    return false
  }

  private getSequencedActionList () : Action[] {
    let { from, to, board } = this
    return [
      new SelectAction(from, to),
      new UnselectAction(from, to),
      this.getEatAction(from, to, board),
      new AdvanceAction(from, to),
    ]
  }

  private getEatAction (from : Place, to : Place, board : Place[][]) : EatAction {
    var eat = new EatAction(from, to, board)
    eat.OnEat = newTo => this._to = newTo
    return eat
  }

  private performAfterActions () : void {
    let action, i
    let actions = this.getAfterActionList()

    for (i = 0; i < actions.length; i++) {
      action = actions[i]
      if(action.canPerform()) {
        action.perform()
      }
    }
  }

  private getAfterActionList () : Action[] {
    let { to } = this
    return [
      new CoronationAction(to)
    ]
  }

}

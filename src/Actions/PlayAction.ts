import Place from '../Models/Place'
import Piece from '../Models/Piece'
import EatAction from './EatAction'
import { Action } from './Action'
import SelectAction from './SelectAction'
import PlayResponse from '../Models/PlayResponse'
import AdvanceAction from './AdvanceAction'
import UnselectAction from './UnselectAction'
import ComboPlayAction from './ComboPlayAction'
import CoronationAction from './CoronationAction'
import { isEatingAFriendPiece, isAdvancingPlace } from './helpers'

export default class PlayAction implements Action {

  private _eatedPiece : boolean
  private _isAdvancingPlace : boolean
  private _from : Place
  private _to : Place
  private _board : Place[][]
  private playResponse : PlayResponse

  constructor (from : Place, to : Place, board : Place[][]) {
    this._from = from
    this._to = to
    this._board = board
    this._eatedPiece = false
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

  get eatedPiece () : boolean {
    return this._eatedPiece
  }

  get isAdvancingPlace () : boolean {
    return isAdvancingPlace(this.from, this.to)
  }

  /* Methods */

  public canPerform () : boolean {
    if (this.to === null) return false
    else if (isEatingAFriendPiece(this.from, this.to)) return false
    else return true
  }


  public perform () : PlayResponse {
    if (!this.canPerform()) return PlayResponse.invalid()
    this.playResponse = this.performActions()
    this.performAfterActions()
    return this.playResponse
  }

  private performActions () : PlayResponse {
    let action, i
    let actions = this.getSequencedActionList()

    for (i = 0; i < actions.length; i++) {
      action = actions[i]
      if(action.canPerform()) return action.perform()
    }
    return PlayResponse.invalid()
  }

  private getSequencedActionList () : Action[] {
    let { from, to, board } = this
    return [
      new SelectAction(from, to),
      new UnselectAction(from, to),
      this.getEatAction(),
      new AdvanceAction(from, to),
    ]
  }

  private getEatAction () : EatAction {
    var eat = new EatAction(this.from, this.to, this.board)
    eat.OnEat = newTo => {
      this._to = newTo
      this._eatedPiece = true
    }
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
      new CoronationAction(to),
      this.getComboPlayAction()
    ]
  }

  private getComboPlayAction () : ComboPlayAction {
    let action = new ComboPlayAction(this.to, this.board, this._eatedPiece)
    action.onDiscoverHasMoreMovies = () => {
      this.playResponse = PlayResponse.stillHappening(this.to)
    }
    return action
  }


}

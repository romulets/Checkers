import Place from '../Models/Place'
import Piece from '../Models/Piece'
import EatAction from './EatAction'
import AdvanceAction from './AdvanceAction'

export default class PlayAction {

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

  public canPlay () : boolean {
    if (this.to === null) return false
    else if (this.isSelectingPiece()) return true
    else if (this.isUnselectingPiece()) return true
    else if (this.isEatingAFriendPiece()) return false
    else if (this.isAdvancingPlace()) return true
    else return false
  }

  private isEating () : boolean {
    return this.from !== null && this.to !== null &&
            !this.from.isEmpty() && !this.to.isEmpty()
  }

  public isEatingAFriendPiece () : boolean {
    return this.isEating() &&
            this.from.piece.player === this.to.piece.player
  }

  public isEatingAnEnemyPiece () : boolean {
    return this.isEating() &&
            this.from.piece.player !== this.to.piece.player
  }

  public isUnselectingPiece () : boolean {
    return this.from !== null && this.from.equalsTo(this.to)
  }

  public isSelectingPiece () : boolean {
    return this.from === null && !this.to.isEmpty()
  }

  public isMoveToTopRight() : boolean {
    let { from, to } = this
    return from.X === to.X - 1 && from.Y === to.Y + 1
  }

  public isMoveToTopLeft() : boolean {
    let { from, to } = this
    return from.X === to.X - 1 && from.Y === to.Y - 1
  }

  public isMoveToBotRight() : boolean {
    let { from, to } = this
    return from.X === to.X + 1 && from.Y === to.Y + 1
  }

  public isMoveToBotLeft() : boolean {
    let { from, to } = this
    return from.X === to.X + 1 && from.Y === to.Y - 1
  }

  public isAdvancingPlace () : boolean {
    let { from, to } = this

    if (from === null || from.isEmpty()) return false
    if (from.piece.isQueen) return true

    if (from.piece.player.moveFoward) {
      return this.isMoveToTopRight() || this.isMoveToTopLeft()
    } else {
        return this.isMoveToBotRight() || this.isMoveToBotLeft()
    }
  }

  public performPlay () : boolean {
    if (!this.canPlay()) return false

    if (this.isSelectingPiece()) {
      this.to.selected = true
      return true
    } else if (this.isUnselectingPiece()) {
      this.to.selected = false
      return true
    } else if (this.isEating()) {
      return new EatAction(this).performEat()
    } else if (this.isAdvancingPlace()) {
      return new AdvanceAction(this).performAdvance()
    }

    return false
  }

}

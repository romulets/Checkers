import Place from '../Models/Place'
import Piece from '../Models/Piece'

export default class Play {

  private _from : Place
  private _to : Place
  private board : Place[][]

  constructor (from : Place, to : Place, board : Place[][]) {
      this._from = from
      this._to = to
      this.board = board
  }

  get from () : Place {
    return this._from
  }

  get to () : Place {
    return this._to
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

  public canPlay () : boolean {
    if (this.to === null) return false
    else if (this.isSelectingPiece()) return true
    else if (this.isUnselectingPiece()) return true
    else if (this.isEatingAFriendPiece()) return false
    else if (this.isAdvancingPlace()) return true
    else return false
  }

  public isUnselectingPiece () : boolean {
    return this.from !== null && this.from.equalsTo(this.to)
  }

  public isSelectingPiece () : boolean {
    return this.from === null && !this.to.isEmpty()
  }

  public isAdvancingPlace () : boolean {
    var { from, to } = this

    if (from === null || from.isEmpty()) return false
    if (from.piece.isQueen) return true

    if (from.piece.player.moveFoward) {
      return this.isMoveToTopRight() || this.isMoveToTopLeft()
    } else {
        return this.isMoveToBotRight() || this.isMoveToBotLeft()
    }
  }

  public isMoveToTopRight() : boolean {
    var { from, to } = this
    return from.X === to.X - 1 && from.Y === to.Y + 1
  }

  public isMoveToTopLeft() : boolean {
    var { from, to } = this
    return from.X === to.X - 1 && from.Y === to.Y - 1
  }

  public isMoveToBotRight() : boolean {
    var { from, to } = this
    return from.X === to.X + 1 && from.Y === to.Y + 1
  }

  public isMoveToBotLeft() : boolean {
    var { from, to } = this
    return from.X === to.X + 1 && from.Y === to.Y - 1
  }

  public performPlay () : boolean {
    if (!this.canPlay()) return false

    if (this.isSelectingPiece()) {
      this.to.selected = true
    } else if (this.isUnselectingPiece()) {
      this.to.selected = false
    } else if (this.isEating()) {
      return this.eat()
    } else if (this.isAdvancingPlace()) {
      this.advancePlace()
    }

    return true
  }

  private eat() : boolean {
    var { from, to } = this
    var placeToEat = this.getPlaceToEat()
    var piece = from.piece
    var eatedPiece = to.piece
    from.piece = null
    from.selected = false
    to.piece = null
    to.selected = false
    placeToEat.piece = piece
    return true
  }

  private getPlaceToEat() : Place {
    var { to } = this
    var place

    if (this.isMoveToTopRight()) {
      place = this.board[to.X + 1][to.Y - 1]
    } else if (this.isMoveToTopLeft()) {
      place = this.board[to.X + 1][to.Y + 1]
    } else if (this.isMoveToBotRight()) {
      place = this.board[to.X - 1][to.Y - 1]
    } else {
      place = this.board[to.X - 1][to.Y + 1]
    }

    return place
  }

  private advancePlace() : void {
    var piece = this.from.piece
    this.to.selected = false
    this.from.selected = false
    this.from.piece = null
    this.to.piece = piece
  }
}

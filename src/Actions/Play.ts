import Place from '../Models/Place'

export default class Play {

  private from : Place
  private to : Place

  constructor (from : Place, to : Place) {
      this.from = from
      this.to = to
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
    if (from.piece.isKing) return true

    var isDiagonTopRight =  from.X === to.X - 1 && from.Y === to.Y + 1
    var isDiagonTopLeft =  from.X === to.X - 1 && from.Y === to.Y - 1
    var isDiagonBotRight =  from.X === to.X + 1 && from.Y === to.Y + 1
    var isDiagonBotLeft =  from.X === to.X + 1 && from.Y === to.Y - 1

    if (from.piece.player.forward) {
      return isDiagonTopRight || isDiagonTopLeft
    } else {
        return isDiagonBotRight || isDiagonBotLeft
    }

  }

  public performPlay () : boolean {
    if (!this.canPlay()) return false

    if (this.isSelectingPiece()) {
      this.to.selected = true
    } else if (this.isUnselectingPiece()) {
      this.to.selected = false
    } else if (this.isEating()) {
      this.eat()
    } else if (this.isAdvancingPlace()) {
      this.advancePlace()
    }

    return true
  }

  private eat() : void {
    console.log('TO IMPLEMENT')
  }

  private advancePlace() : void {
    var piece = this.from.piece
    this.to.selected = false
    this.from.selected = false
    this.from.piece = null
    this.to.piece = piece
  }
}

import Place from './Place'

export default class Play {

  private from : Place
  private to : Place

  constructor (from : Place, to : Place) {
      this.from = from
      this.to = to
  }

  public canPlay () : boolean {
    if (this.to === null) return false
    else if (this.isSelectingPiece()) return true
    else if (this.isUnselectingPiece()) return true
    else if (this.isMovingCorrectly()) return true
    else return false
  }

  public isUnselectingPiece () : boolean {
    return this.from !== null && this.from.equalsTo(this.to)
  }

  public isSelectingPiece () : boolean {
    return this.from === null && !this.to.isEmpty()
  }

  public isMovingCorrectly () : boolean {
    var { from, to } = this

    if (from === null || from.isEmpty()) return false
    if (from.piece.isKing) return true

    var isDiagonTopRight =  from.X === to.X - 1 &&
                            from.Y === to.Y + 1

    var isDiagonTopLeft =  from.X === to.X - 1 &&
                            from.Y === to.Y - 1

    var isDiagonBotRight =  from.X === to.X + 1 &&
                            from.Y === to.Y + 1

    var isDiagonBotLeft =  from.X === to.X + 1 &&
                            from.Y === to.Y - 1

    if (from.piece.player.forward) {
      return isDiagonTopRight || isDiagonTopLeft
    } else {
        return isDiagonBotRight || isDiagonBotLeft
    }

  }

}

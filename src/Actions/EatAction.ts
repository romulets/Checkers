import PlayAction from './PlayAction'
import Place from '../Models/Place'
import InvalidPlayException from '../Exceptions/InvalidPlayException'
import NonEmptyPlaceException from '../Exceptions/NonEmptyPlaceException'

export default class EatAction {

  private play : PlayAction

  constructor (play : PlayAction) {
    this.play = play
  }

  /* Methods */

  public performEat() : boolean {
    let { from, to } = this.play
    let placeToEat

    try {
      placeToEat = this.getPlaceToEat()
      if(!placeToEat.isEmpty()) throw new NonEmptyPlaceException(placeToEat)
    } catch (ex) {
      if (ex instanceof InvalidPlayException) return false
    }

    let piece = from.piece
    let eatedPiece = to.piece
    eatedPiece.inGame = false
    from.piece = null
    from.selected = false
    to.piece = null
    to.selected = false
    placeToEat.piece = piece
    return true
  }

  private getPlaceToEat() : Place {
    let place

    try {
      place = this.indentifyPlace()
    } catch (ex) {
      if (ex instanceof TypeError) {
        place = undefined
      }
    }

    if(place === undefined) {
      throw new InvalidPlayException("Place doesn't exists")
    }

    return place
  }

  private indentifyPlace () : Place {
    let { play } = this
    let { to } = play
    let place
    if (play.isMoveToTopRight()) {
      place = play.board[to.X + 1][to.Y - 1]
    } else if (play.isMoveToTopLeft()) {
      place = play.board[to.X + 1][to.Y + 1]
    } else if (play.isMoveToBotRight()) {
      place = play.board[to.X - 1][to.Y - 1]
    } else {
      place = play.board[to.X - 1][to.Y + 1]
    }

    return place
  }

}

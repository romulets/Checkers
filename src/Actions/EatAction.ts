import PlayAction from './PlayAction'
import Place from '../Models/Place'
import InvalidPlayException from '../Exceptions/InvalidPlayException'
import NonEmptyPlaceException from '../Exceptions/NonEmptyPlaceException'
import { Action } from './Action'
import {
  isMoveToTopRight, isMoveToTopLeft, isMoveToBotRight, isEating, isAdvancingPlace
} from './Helpers'

export default class EatAction implements Action {

  public OnEat : (newTo : Place) => void
  private from : Place
  private to : Place
  private board : Place[][]

  constructor (from : Place, to : Place, board : Place[][]) {
    this.OnEat = null
    this.from = from
    this.to = to
    this.board = board
  }

  /* Methods */

  public canPerform () : boolean  {
    let  { from, to } = this
    return isEating(from, to) && isAdvancingPlace(from, to)
  }

  public perform () : boolean {
    let placeToEat

    try {
      placeToEat = this.getPlaceToEat()
      if(!placeToEat.isEmpty()) throw new NonEmptyPlaceException(placeToEat)
    } catch (ex) {
      if (ex instanceof InvalidPlayException) return false
    }

    return this.eat(placeToEat)
  }

  private eat(placeToEat : Place) : boolean {
    let { from, to } = this
    let piece = from.piece
    let eatedPiece = to.piece
    eatedPiece.inGame = false
    from.piece = null
    from.selected = false
    to.piece = null
    to.selected = false
    placeToEat.piece = piece
    this.fireOnEat(placeToEat)
    return true
  }

  private fireOnEat(newTo : Place) : void {
    if (this.OnEat !== null) {
      this.OnEat(newTo)
    }
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
    let { from, to } = this
    let place

    if (isMoveToTopRight(from, to)) {
      place = this.board[to.X + 1][to.Y - 1]
    } else if (isMoveToTopLeft(from, to)) {
      place = this.board[to.X + 1][to.Y + 1]
    } else if (isMoveToBotRight(from, to)) {
      place = this.board[to.X - 1][to.Y - 1]
    } else {
      place = this.board[to.X - 1][to.Y + 1]
    }

    return place
  }

}

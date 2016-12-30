import Place from '../Models/Place'
import { Action } from './Action'
import PlayResponse from '../Models/PlayResponse'
import InvalidPlayException from '../Exceptions/InvalidPlayException'
import NonEmptyPlaceException from '../Exceptions/NonEmptyPlaceException'
import {
          isEating,
          isAdvancingPlace,
          indentifyNextPlaceAfterEat
        } from './helpers'

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

  public perform () : PlayResponse {
    let placeToEat

    try {
      placeToEat = indentifyNextPlaceAfterEat(this.from, this.to, this.board)
      if(!placeToEat.isEmpty()) throw new NonEmptyPlaceException(placeToEat)
    } catch (ex) {
      if (ex instanceof InvalidPlayException) return PlayResponse.invalid()
    }

    if (this.eat(placeToEat))  {
      return PlayResponse.finished()
    } else {
      return PlayResponse.invalid()
    }
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

}

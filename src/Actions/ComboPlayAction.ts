import Place from '../Models/Place'
import Point from '../Models/Point'
import { Action } from './Action'
import PlayResponse from '../Models/PlayResponse'
import InvalidPlayException from '../Exceptions/InvalidPlayException'
import {
        indentifyNextPlaceAfterEat,
        isEatingAnEnemyPiece,
        isEating
      } from './helpers'

export default class ComboPlayAction implements Action {

  public onDiscoverHasMoreMovies : () => void
  private to : Place
  private isAfterEat : boolean
  private board : Place[][]

  constructor (to : Place, board : Place[][], isAfterEat : boolean) {
    this.to = to
    this.isAfterEat = isAfterEat
    this.board = board
  }

  /* Methods */

  public perform () : PlayResponse {
    this.to.selected = true
    this.fireOnDiscoverHasMoreMovies()
    return PlayResponse.stillHappening(this.to)
  }

  private fireOnDiscoverHasMoreMovies () : void {
    if (this.onDiscoverHasMoreMovies) {
      this.onDiscoverHasMoreMovies()
    }
  }

  public canPerform () : boolean {
    return this.isAfterEat && this.claimComboPlay()
  }

  private claimComboPlay() : boolean {
      if (this.to.isEmpty()) return false

      let piece = this.to.piece
      if (piece.isQueen) return this.claimComboForQueen()
      if (piece.player.moveFoward) return this.claimComboForForwarder()
      else return this.claimComboForBackwarder()
  }

  private claimComboForQueen () : boolean {
    return this.claimComboForForwarder() || this.claimComboForBackwarder()
  }

  private claimComboForForwarder () : boolean {
    let { x, y } = this.to.point
    return this.canEatAt(new Point(x + 1, y - 1)) ||
            this.canEatAt(new Point(x + 1, y + 1))
  }

  private claimComboForBackwarder () : boolean {
    let { x, y } = this.to.point
    return this.canEatAt(new Point(x - 1, y + 1))
            || this.canEatAt(new Point(x - 1, y - 1))
  }

  private canEatAt (point : Point) : boolean {
    try {
      return this.eatAt(point)
    } catch (ex) {
      if (ex instanceof InvalidPlayException || ex instanceof TypeError) {
        return false
      }
    }
  }

  private eatAt (point : Point) : boolean {
    let intendedNextPlace, placeAfterEat
    intendedNextPlace = this.board[point.x][point.y]
    placeAfterEat = indentifyNextPlaceAfterEat(this.to,
                                                intendedNextPlace,
                                                this.board)
    return !intendedNextPlace.isEmpty() &&
            isEatingAnEnemyPiece(this.to, intendedNextPlace)
  }

}

import Place from '../Models/Place'
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
    let { X, Y } = this.to
    return this.canEatAt(X + 1, Y - 1) || this.canEatAt(X + 1, Y + 1)
  }

  private claimComboForBackwarder () : boolean {
    let { X, Y } = this.to
    return this.canEatAt(X - 1, Y + 1) || this.canEatAt(X - 1, Y - 1)
  }

  private canEatAt (x : number, y : number) : boolean {
    try {
      return this.eatAt(x, y)
    } catch (ex) {
      if (ex instanceof InvalidPlayException || ex instanceof TypeError) {
        return false
      }
    }
  }

  private eatAt (x : number, y : number) : boolean {
    let intendedNextPlace, placeAfterEat
    intendedNextPlace = this.board[x][y]
    placeAfterEat = indentifyNextPlaceAfterEat(this.to,
                                                intendedNextPlace,
                                                this.board)
    return !intendedNextPlace.isEmpty() &&
            isEatingAnEnemyPiece(this.to, intendedNextPlace)
  }

}

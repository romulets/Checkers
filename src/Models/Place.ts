import Piece from './Piece'
import NonEmptyPlaceException from '../Exceptions/NonEmptyPlaceException'
import InvalidPlayException from '../Exceptions/InvalidPlayException'

export default class Place {

  public X : number
  public Y : number

  private _piece : Piece = null
  private playable : boolean

  constructor (playable : boolean) {
      this.playable = playable
  }

  get piece () : Piece {
    return this._piece
  }

  set piece (piece : Piece) {
    if (!this.playable) throw new InvalidPlayException('Place not playable')
    if (this.isEmpty()) throw new NonEmptyPlaceException(this)
  }

  public isEmpty () : boolean {
    return this._piece !== null
  }

}

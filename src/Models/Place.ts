import Piece from './Piece'
import InvalidPlayException from '../Exceptions/InvalidPlayException'
import NonEmptyPlaceException from '../Exceptions/NonEmptyPlaceException'

const LIGHT_PLACE = '#CCC'
const DARK_PLACE = '#AAA'

export default class Place {

  public X : number
  public Y : number
  private _piece : Piece = null
  private playable : boolean
  private _selected : boolean = false

  private td :HTMLElement

  constructor (playable : boolean) {
    this.playable = playable
    this.createDOMElement()
  }

  /* Getters and Setters */

  get selected () : boolean {
    return this._selected
  }

  set selected (selected : boolean) {
    this._selected = selected

    let classList = this.td.classList
    if(selected) {
      classList.add('active')
    } else {
      classList.remove('active')
    }
  }

  get piece () : Piece {
    return this._piece
  }

  set piece (piece : Piece) {
    if (piece !== null) {
      if (!this.playable)  throw new InvalidPlayException('Place not playable')
      if (!this.isEmpty()) throw new NonEmptyPlaceException(this)

      piece.X = this.X
      piece.Y = this.Y
    }

    this._piece = piece
    this.appendsPieceElement()
  }

  get element () : HTMLElement {
    return this.td
  }

  /* Methods */

  private  createDOMElement () : void {
    this.td = document.createElement('td')
    this.td.style.backgroundColor = this.playable ? DARK_PLACE : LIGHT_PLACE
  }

  private appendsPieceElement () : void {
    if(this.isEmpty()) {
      this.td.innerHTML = ''
    } else {
      this.element.appendChild(this.piece.element)
    }
  }

  public isEmpty () : boolean {
    return this._piece === null
  }

  public isPlayable () : boolean {
    return this.playable
  }

  public equalsTo(place : Place) : boolean {
    if (place === null) return false

    return this.X ===  place.X &&
            this.Y ===  place.Y
  }

}

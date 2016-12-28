import Piece from './Piece'
import NonEmptyPlaceException from '../Exceptions/NonEmptyPlaceException'
import InvalidPlayException from '../Exceptions/InvalidPlayException'

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

    this.td = document.createElement('td')
    this.td.style.backgroundColor = this.playable ? LIGHT_PLACE : DARK_PLACE
  }

  get selected () : boolean {
    return this._selected
  }

  set selected (selected : boolean) {
    this._selected = selected

    var classList = this.td.classList
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
    if (!this.playable && piece !== null) throw new InvalidPlayException('Place not playable')
    if (!this.isEmpty() && piece !== null) throw new NonEmptyPlaceException(this)
    this._piece = piece
    this.handleDOM()
  }

  private handleDOM() : void {
    if(this.isEmpty()) {
      this.td.innerHTML = ''
    } else {
      this.element.appendChild(this.piece.element)
    }
  }

  get element() : HTMLElement {
    return this.td
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

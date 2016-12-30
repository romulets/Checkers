import Player from './Player'
import Point from './Point'

export default class Piece {

  public point : Point
  public inGame : boolean
  private _isQueen : boolean
  private span : HTMLElement
  private _player : Player

  constructor (player : Player, color : string) {
    this.createDOMElement(color)
    this._player = player
    this.isQueen = false
    this.inGame = true
  }

  /* Getters and Setters */

  get isQueen () : boolean {
    return  this._isQueen
  }

  set isQueen (isQueen : boolean) {
    this._isQueen = isQueen

    if (isQueen) {
      this.element.classList.add('queen')
    } else {
      this.element.classList.remove('queen')
    }

  }

  get element () : HTMLElement {
    return this.span
  }

  get player () : Player {
    return this._player
  }

  /* Methods */

  private createDOMElement (color : string) : void {
    this.span = document.createElement('span')
    this.span.classList.add('piece')
    this.span.style.backgroundColor = color
  }

}

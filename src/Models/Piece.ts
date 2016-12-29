import Player from './Player'

export default class Piece {

  public isQueen : boolean
  private span : HTMLElement
  private _player : Player

  constructor (player : Player, color : string) {
    this._player = player
    this.isQueen = false
    this.createDOMElement(color)
  }

  /* Getters and Setters */

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

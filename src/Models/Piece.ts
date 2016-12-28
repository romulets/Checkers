import Player from './Player'

export default class Piece {

  public isKing : boolean = false

  private span : HTMLElement
  private _player : Player

  constructor (player : Player, color : string) {
    this.span = document.createElement('span')
    this.span.classList.add('piece')
    this.span.style.backgroundColor = color
    this._player = player
  }

  get element () : HTMLElement {
    return this.span
  }

  get player() : Player {
    return this._player
  }

}

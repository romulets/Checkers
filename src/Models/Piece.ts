import Player from './Player'
import Point from './Point'
import Place from './Place'
import InvalidPlayException from '../Exceptions/InvalidPlayException'
import { indentifyNextPlaceAfterEat } from '../utils'

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

  public hasPlaceToGo (board : Place[][]) : boolean {
    if (this.isQueen) return this.canGoTop(board) || this.canGoBot(board)
    if (this.player.moveFoward) return this.canGoBot(board)
    return this.canGoTop(board)
  }

  private canGoTop (board : Place[][]) : boolean {
    return this.canGoTopLeft(board) || this.canGoTopRight(board);
  }

  private canGoBot (board : Place[][]) : boolean {
    return this.canGoBotLeft(board) || this.canGoBotRight(board);
  }

  private canGoTopRight (board : Place[][]) : boolean {
    let point = new Point(this.point.x - 1, this.point.y + 1)
    return this.canGoTo(point, board)
  }

  private canGoTopLeft (board : Place[][]) : boolean {
    let point = new Point(this.point.x - 1, this.point.y - 1)
    return this.canGoTo(point, board)
  }

  private canGoBotRight (board : Place[][]) : boolean {
    let point = new Point(this.point.x + 1, this.point.y + 1)
    return this.canGoTo(point, board)
  }

  private canGoBotLeft (board : Place[][]) : boolean {
    let point = new Point(this.point.x + 1, this.point.y - 1)
    return this.canGoTo(point, board)
  }

  private canGoTo (point : Point, board : Place[][]) : boolean {
    try {
      let to = board[point.x][point.y]
      if (to === undefined) return false
      if (to.isEmpty()) return true
      if (to.piece.player === this.player) return false

      let from = board[this.point.x][this.point.y]
      indentifyNextPlaceAfterEat(from, to, board)
      return true
    } catch (ex) {
      if (ex instanceof InvalidPlayException) return false
      if (ex instanceof TypeError) return false
      throw ex
    }
  }

}

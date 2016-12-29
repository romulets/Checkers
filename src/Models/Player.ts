import Piece from './Piece'

const INITIAL_PIECES_COUNT = 12

export default class Player {

  public moveFoward = false
  private _pieces : Piece[]
  private _color : string

  constructor (piecesColor : string) {
    this._color = piecesColor
    this.initPieces(piecesColor)
  }

  /* Getters and Setters */

  get pieces () :  Piece[] {
    return this._pieces
  }

  get color () : string {
    return this._color
  }

  /* Methods */

  private initPieces (piecesColor : string) : void {
    this._pieces = []
    for (var i = 0; i < INITIAL_PIECES_COUNT; i++) {
      this._pieces.push(new Piece(this, piecesColor))
    }
  }

}

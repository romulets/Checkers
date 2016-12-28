import Piece from './Piece'

const INITIAL__pieces_COUNT = 12

export default class Player {

  public forward = false

  private _pieces : Piece[]

  public constructor (pieceColor : string) {
    this.initPieces(pieceColor)
  }

  private initPieces (pieceColor : string) : void {
    this._pieces = []

    for (var i = 0; i < INITIAL__pieces_COUNT; i++) {
      this._pieces.push(new Piece(this, pieceColor))
    }
  }

  get pieces () :  Piece[] {
    return this._pieces
  }

}

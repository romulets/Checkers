import Piece from './Piece'

const INITIAL_PIECES_COUNT = 12

export default class Player {

  private pieces : Array<Piece>

  public constructor (pieceColor : string) {
    this.initPieces(pieceColor)
  }

  private initPieces (pieceColor : string) : void {
    this.pieces = []

    for (var i = 0; i < INITIAL_PIECES_COUNT; i++) {
      this.pieces.push(new Piece(pieceColor))
    }

  }

}

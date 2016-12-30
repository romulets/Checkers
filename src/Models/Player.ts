import Piece from './Piece'

const INITIAL_PIECES_COUNT = 12

export default class Player {

  public moveFoward = false
  private _name : string
  private _pieces : Piece[]
  private _color : string
  private wrapperElement : HTMLElement
  private nameElement : HTMLElement
  private piecesInGameElement : HTMLElement
  private eatedPiecesElement : HTMLElement

  constructor (name : string, piecesColor : string) {
    this._color = piecesColor
    this._name = name
    this.initPieces(piecesColor)
    this.createDOMElement()
  }

  /* Getters and Setters */

  get pieces () :  Piece[] {
    return this._pieces
  }

  get color () : string {
    return this._color
  }

  get name () : string {
    return this._name
  }

  get element () : HTMLElement {
    return this.wrapperElement
  }

  get piecesInGame () :  Piece[] {
    var pieces = []
    this.pieces.forEach(p => {
      if (p.inGame) pieces.push(p)
    })
    return pieces
  }

  get eatedPieces () :  Piece[] {
    var pieces = []
    this.pieces.forEach(p => {
      if (!p.inGame) pieces.push(p)
    })
    return pieces
  }

  /* Methods */

  private initPieces (piecesColor : string) : void {
    this._pieces = []
    for (let i = 0; i < INITIAL_PIECES_COUNT; i++) {
      this._pieces.push(new Piece(this, piecesColor))
    }
  }

  private createDOMElement () : void {
    this.wrapperElement = document.createElement('div')
    this.wrapperElement.classList.add('checkers-player')
    this.wrapperElement.appendChild(this.getNameElement())
    this.wrapperElement.appendChild(this.getEatedPiecesElement())
    this.wrapperElement.appendChild(this.getPiecesInGameElement())
  }

  private getNameElement () : HTMLElement {
    this.nameElement = document.createElement('h4')
    this.nameElement.innerHTML = `${this.name} `
    this.nameElement.appendChild(this.getLittlePieceElement())
    return this.nameElement
  }

  private getLittlePieceElement () : HTMLElement {
    var littlePiece = document.createElement('span')
    littlePiece.classList.add('little-piece')
    littlePiece.style.backgroundColor = this.color
    return littlePiece
  }

  private getPiecesInGameElement () : HTMLElement {
    this.piecesInGameElement = document.createElement('p')
    return this.piecesInGameElement
  }
  private getEatedPiecesElement () : HTMLElement {
    this.eatedPiecesElement = document.createElement('p')
    return this.eatedPiecesElement
  }

  public updateElementInfos () : void {
    this.piecesInGameElement.innerHTML = `In Game pieces: ${this.piecesInGame.length}`
    this.eatedPiecesElement.innerHTML = `Eaten pieces: ${this.eatedPieces.length}`
  }

}

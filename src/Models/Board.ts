import Place from './Place'
import Player from './Player'
import Play from './Play'

const BOARD_WIDTH = 8
const BOARD_HEIGHT = 8

export default class Board {

  private table : HTMLElement
  private boardMask: Place[][] = []
  private player1 : Player
  private player2 : Player
  private selectedPlace : Place = null

  public constructor (renderSelector : string, pl1 : Player, pl2 : Player) {
      this.setupBoard()
      this.setupPlayers(pl1, pl2)
      this.renderHTML(renderSelector)
  }

  private setupPlayers (pl1 : Player, pl2 : Player) : void {
    pl1.forward = true
    this.initPieces(pl1)
    pl2.forward = false
    this.initPieces(pl2)
  }

  private setupBoard () : void {
    var x, y, playable, tr, place

    this.createTable()

    playable = false
    for (x = 0; x < BOARD_WIDTH; x++) {
      tr = document.createElement('tr')
      this.boardMask[x] = []

      for (y = 0; y < BOARD_HEIGHT; y++) {
        place = this.createPlace(x, y, playable)
        tr.appendChild(place.element)
        playable = !playable
      }

      playable = !playable
      this.table.appendChild(tr)
    }
  }

  private initPieces (player : Player) {
    var initialLine = player.forward ? 0 : 5
    var place, x, y
    var piecesInBoardCount = 0;

    for (x = initialLine; x < initialLine + 3; x++) {
      for (y = 0; y < BOARD_HEIGHT; y++) {
        place = this.boardMask[x][y]
        if (place.isPlayable()) {
          place.piece = player.pieces[piecesInBoardCount]
          piecesInBoardCount++
        }
      }
    }
  }

  private createPlace (x : number, y : number, playable : boolean) : Place {
    var place = new Place(playable)
    place.X = x
    place.Y = y
    this.boardMask[x][y] = place
    place.element.addEventListener('click', this.handleClick.bind(this, place))
    return place
  }

  private handleClick (place : Place) : void {
    var play = new Play(this.selectedPlace, place)

    if (!play.canPlay()) return;

    if (play.isSelectingPiece()) {
      place.selected = true
    } else if (play.isUnselectingPiece()) {
      place.selected = false
    } else if (play.isMovingCorrectly()) {
      place.selected = false
      this.selectedPlace.selected = false
      var piece = this.selectedPlace.piece
      this.selectedPlace.piece = null
      place.piece = piece
    }

    if (place.selected) {
      this.selectedPlace = place
    } else {
        this.selectedPlace = null
    }
  }

  private createTable () : void {
    this.table =  document.createElement('table')
    this.table.classList.add('checkers-board')
  }

  private renderHTML (renderSelector : string) : void {
    document.querySelector(renderSelector).appendChild(this.table)
  }

}

import Place from './Place'
import Player from './Player'
import Mediator from './Mediator'
import PlayAction from '../Actions/PlayAction'
import { PlayStatus } from './PlayStatus'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../consts'

export default class Board {

  private mediator : Mediator
  private table : HTMLElement
  private boardMask: Place[][]
  private selectedPlace : Place
  private player1 : Player
  private player2 : Player

  public constructor (renderSelector : string, pl1 : Player, pl2 : Player) {
      this.setupMediator(pl1, pl2)
      this.setupBoard()
      this.setupPlayers(pl1, pl2)
      this.renderHTML(renderSelector)
  }

  /* Methods */

  private setupMediator(pl1 : Player, pl2 : Player) {
    this.mediator = new Mediator(pl1, pl2)
  }

  private setupPlayers (pl1 : Player, pl2 : Player) : void {
    pl1.moveFoward = true
    pl2.moveFoward = false
    this.initPieces(pl1)
    this.initPieces(pl2)
  }

  private setupBoard () : void {
    let x, y, playable, tr, place
    playable = false
    this.boardMask = []
    this.selectedPlace = null
    this.createTableDOMElement()

    for (x = 0; x < BOARD_WIDTH; x++) {
      tr = document.createElement('tr')
      this.boardMask[x] = []

      for (y = 0; y < BOARD_HEIGHT; y++) {
        place = this.createPlace(x, y, playable)
        playable = !playable
        tr.appendChild(place.element)
      }

      this.table.appendChild(tr)
      playable = !playable
    }
  }

  private initPieces (player : Player) {
    let place, x, y
    let initialLine = player.moveFoward ? 0 : 5
    let piecesInBoardCount = 0;

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
    let place = new Place(playable)
    place.X = x
    place.Y = y
    this.boardMask[x][y] = place
    place.element.addEventListener('click', this.play.bind(this, place))
    return place
  }

  private play (place : Place) : void {
    let playResponse = this.mediator.play(this.selectedPlace,place, this.boardMask)
    if (playResponse.playStatus === PlayStatus.INVALID) return
    this.selectedPlace = playResponse.selectedPlace
  }

  private createTableDOMElement () : void {
    this.table =  document.createElement('table')
    this.table.classList.add('checkers-board')
  }

  private renderHTML (renderSelector : string) : void {
    let rootElement = document.querySelector(renderSelector)
    rootElement.appendChild(this.mediator.element)
    rootElement.appendChild(this.table)
  }

}

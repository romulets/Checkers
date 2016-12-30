import Place from './Place'
import Player from './Player'
import PlayAction from '../Actions/PlayAction'
import PlayResponse from './PlayResponse'
import { PlayStatus } from './PlayStatus'
import { isEatingAnEnemyPiece, isAdvancingPlace } from '../Actions/helpers'

export default class Mediator {

  private _currentPlayer : Player
  private player1 : Player
  private player2 : Player
  private socoreElement : HTMLElement
  private plays : PlayAction[]

  constructor (pl1 : Player, pl2 : Player) {
    this._currentPlayer = pl1
    this.player1 = pl1
    this.player2 = pl2
    this.plays = []
    this.createDOMElement()
    this.formatScoreElement()
    this.setCurrentPlayerClass()
  }

  /* Getters and Setters */

  get element () : HTMLElement {
    return this.socoreElement
  }

  get currentPlayer () {
    return this._currentPlayer
  }

  /* Methods */

  public play (from : Place, to : Place, board : Place[][]) : PlayResponse {
    let play = new PlayAction(from, to, board, this.getLastPlay())
    if (!this.canPlay(play)) return PlayResponse.invalid()
    return this.perform(play)
  }

  private getLastPlay () : PlayAction {
    let playsQuantity = this.plays.length
    if (playsQuantity === 0) return null
    return this.plays[playsQuantity - 1]
  }

  private canPlay (play : PlayAction) : boolean {
    let { from, to } = play
    return to.isEmpty() ||
            this.isSelectingCurrentPlayer(to.piece.player)||
            isEatingAnEnemyPiece(from, to)
  }

  private perform (play : PlayAction) : PlayResponse {
    let { from, to } = play
    let playResponse = play.perform()

    if (playResponse.playStatus === PlayStatus.FINISHED) {
      this.alternateBetweenPlayers()
    }

    this.plays.push(play)
    return playResponse
  }

  public isSelectingCurrentPlayer (player : Player) {
   return this._currentPlayer === player
  }

  public alternateBetweenPlayers () : Player {
    this.changePlayer()
    this.formatScoreElement()
    return this.currentPlayer
  }

  private changePlayer () : void {
    this.unsetPlayersClass()
    if (this.isSelectingCurrentPlayer(this.player1)) {
      this._currentPlayer  = this.player2
    } else {
      this._currentPlayer  = this.player1
    }
    this.setCurrentPlayerClass()
  }

  private setCurrentPlayerClass () : void {
    this.currentPlayer.element.classList.add('playing')
  }

  private unsetPlayersClass () : void {
    this.player1.element.classList.remove('playing')
    this.player2.element.classList.remove('playing')

  }

  private createDOMElement () : void {
    this.socoreElement = document.createElement('div')
    this.socoreElement.classList.add('checkers-score')
    this.socoreElement.appendChild(this.player1.element)
    this.socoreElement.appendChild(this.player2.element)
  }

  private formatScoreElement () : void {
    this.player1.updateElementInfos()
    this.player2.updateElementInfos()
  }

}

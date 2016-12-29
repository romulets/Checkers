import Player from './Player'
import Place from './Place'
import Play from '../Actions/Play'

export default class GameController {

  private _currentPlayer : Player
  private player1 : Player
  private player2 : Player
  private socoreElement : HTMLElement

  constructor (pl1 : Player, pl2 : Player) {
    this._currentPlayer = pl1
    this.player1 = pl1
    this.player2 = pl2
    this.initElement()
    this.formatScoreElement()
  }

  private initElement () : void {
    this.socoreElement = document.createElement('p')
    this.socoreElement.classList.add('checkers-score')
  }

  get element () : HTMLElement {
    return this.socoreElement
  }

  get currentPlayer () {
    return this._currentPlayer
  }

   public isCurrentPlayer (player : Player) {
     return this._currentPlayer === player
   }

  public changePlayer () : Player {
    if (this.isCurrentPlayer(this.player1)) {
      this._currentPlayer  = this.player2
    } else {
      this._currentPlayer  = this.player1
    }

    this.formatScoreElement()
    return this.currentPlayer
  }

  private formatScoreElement () : void {
    var littlePiece = document.createElement('span')
    littlePiece.classList.add('little-piece')
    littlePiece.style.backgroundColor = this.currentPlayer.color

    this.socoreElement.innerHTML = 'É a vez do jogador '
    this.socoreElement.appendChild(littlePiece)
  }

  public play (from : Place, to : Place, board : Place[][]) : boolean {
    var play = new Play(from, to, board)
    
    if (!to.isEmpty() && !this.isCurrentPlayer(to.piece.player) &&
        !play.isEatingAnEnemyPiece()) {
      return false
    }

    var isAdvancingPlace = play.isAdvancingPlace()
    var isPlaySuccess = play.performPlay()

    if(isPlaySuccess && isAdvancingPlace) {
      this.changePlayer()
    }

    return isPlaySuccess
  }

}

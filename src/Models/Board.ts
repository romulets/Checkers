import Piece from './Piece'
import Player from './Player'

export default class Board {

  private boardMask: Array<Piece> = []
  private player1 : Player
  private player2 : Player

  public constructor (renderSelector : string, pl1 : Player, pl2 : Player) {
      this.renderHTML(renderSelector)
  }

  private renderHTML (renderSelector : string) : void {
    var table = this.getTable()
    document.querySelector(renderSelector).appendChild(table)
  }

  private getTable() : HTMLElement {
    var table =  document.createElement('table')
    table.classList.add('checkers-board')
    return table;
  }

}

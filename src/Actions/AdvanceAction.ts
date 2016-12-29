import PlayAction from './PlayAction'

export default class AdvanceAction {

  private play : PlayAction

  constructor (play : PlayAction) {
    this.play = play
  }

  /* Methods */

  public performAdvance() : boolean {
    let { from, to } = this.play
    let piece = from.piece
    to.selected = false
    from.selected = false
    from.piece = null
    to.piece = piece
    return true
  }

}

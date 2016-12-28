export default class Piece {

  private color : string

  public constructor (color : string) {
    this.color = color
  }

  public render () : string {
    return `<span style="background-color = ${this.color}" class="piece"></span>`
  }

}

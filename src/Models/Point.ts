export default class Point {

  private _x : number
  private _y : number

  constructor (x : number, y : number) {
    this._x = x
    this._y = y
  }

  /* Getters and Setters */

  get x () : number {
    return this._x
  }

  get y () : number {
    return this._y
  }

  /* Methods */

  public equalsTo (other : Point) : boolean {
    return this.x === other.x && this.y === other.y
  }

  public isTop (other : Point) : boolean {
    return this.isTopRight(other) || this.isTopLeft(other)
  }

  public isTopRight (other : Point) : boolean {
    return this.x === other.x - 1 && this.y === other.y + 1
  }

  public isTopLeft (other : Point) : boolean {
    return this.x === other.x - 1 && this.y === other.y - 1
  }

  public isBot (other : Point) : boolean {
    return this.isBotRight(other) || this.isBotLeft(other)
  }

  public isBotRight (other : Point) : boolean {
    return this.x === other.x + 1 && this.y === other.y + 1
  }

  public isBotLeft (other : Point) : boolean {
    return this.x === other.x + 1 && this.y === other.y - 1
  }

  public isLongDiagon (other : Point) : boolean {
    return this.isTop(other) || this.isBot(other)
  }
}

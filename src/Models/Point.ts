import UnextractablePathException from '../Exceptions/UnextractablePathException'

export default class Point {

  private _x : number
  private _y : number
  private walkedPath : Point []

  constructor (x : number, y : number) {
    this._x = x
    this._y = y
    this.walkedPath = []
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
    return this.isLongDiagonTopRight(other) ||
            this.isLongDiagonTopLeft(other) ||
            this.isLongDiagonBotLeft(other) ||
            this.isLongDiagonBotRight(other)
  }

  public isLongDiagonTopRight (other : Point) : boolean {
    let comparisson = point => point.x >= other.x && point.y <= other.y
    let walk = toWalk => new Point(toWalk.x - 1, toWalk.y + 1)
    return this.isLongDiagonGeneric(other, comparisson, walk)
  }

  public isLongDiagonTopLeft (other : Point) : boolean {
    let comparisson = point => point.x >= other.x && point.y >= other.y
    let walk = toWalk => new Point(toWalk.x - 1, toWalk.y - 1)
    return this.isLongDiagonGeneric(other, comparisson, walk)
  }

  public isLongDiagonBotRight (other : Point) : boolean {
    let comparisson = point => point.x <= other.x && point.y <= other.y
    let walk = toWalk => new Point(toWalk.x + 1, toWalk.y + 1)
    return this.isLongDiagonGeneric(other, comparisson, walk)
  }

  public isLongDiagonBotLeft (other : Point) : boolean {
    let comparisson = toCompare => toCompare.x <= other.x && toCompare.y >= other.y
    let walk = toWalk => new Point(toWalk.x + 1, toWalk.y - 1)
    return this.isLongDiagonGeneric(other, comparisson, walk)
  }

  private isLongDiagonGeneric (other : Point,
                                comparisson : (other : Point) => boolean,
                                walk : (point : Point) => Point) : boolean {

      let floatPoint = new Point(this.x, this.y)
      this.walkedPath = []
      while(comparisson(floatPoint)) {
          floatPoint = walk(floatPoint)
          this.walkedPath.push(floatPoint)
          if (floatPoint.x == other.x && floatPoint.y == other.y) return true
      }
      return false
  }

  public getPathTo (other : Point) : Point [] {
    if (this.isLongDiagonTopRight(other)) return this.walkedPath
    if (this.isLongDiagonTopLeft(other)) return this.walkedPath
    if (this.isLongDiagonBotLeft(other)) return this.walkedPath
    if (this.isLongDiagonBotRight(other)) return this.walkedPath
    throw new UnextractablePathException()
  }
}

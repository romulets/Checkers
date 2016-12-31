import Place from '../Models/Place'
import Point from '../Models/Point'
import InvalidPlayException from '../Exceptions/InvalidPlayException'
import UnextractablePathException from '../Exceptions/UnextractablePathException'

/**
 * @function
 */
export function isEating (from : Place, to : Place) : boolean {
  return from !== null && to !== null &&
          !from.isEmpty() && !to.isEmpty()
}

/**
 * @function
 */
export function isEatingAFriendPiece (from : Place, to : Place) : boolean {
  return isEating(from, to) &&
          from.piece.player === to.piece.player &&
          !from.equalsTo(to)
}

/**
 * @function
 */
export function isEatingAnEnemyPiece (from : Place, to : Place) : boolean {
  return isEating(from, to) &&
          from.piece.player !== to.piece.player &&
          !from.equalsTo(to)
}

/**
 * @function
 */
export function isAdvancingPlace (from : Place,
                                    to : Place,
                                    board : Place[][]) : boolean {
  if (from === null || from.isEmpty() || from.equalsTo(to)) return false

  let fromPoint = from.point
  let toPoint = to.point

  if (from.piece.isQueen) return isAdvancingForQueens(fromPoint, toPoint, board)
  if (from.piece.player.moveFoward) return fromPoint.isTop(toPoint)
  else return fromPoint.isBot(toPoint)
}

/**
 * @function
 */
 function isAdvancingForQueens (from : Point,
                                      to : Point,
                                      board : Place[][]) : boolean {
  try {
    let i, point, place
    let path = from.getPathTo(to)

    for(i = 0; i < path.length; i++) {
      point = path[i]
      place = board[point.x][point.y]
      if(!place.isEmpty() && i !== path.length - 1) return false
    }

    return true
  } catch (ex) {
    if (ex instanceof UnextractablePathException) return false
  }
 }

/**
 * @function
 */
export function indentifyNextPlaceAfterEat (from : Place,
                                            to : Place,
                                            board : Place[][]) : Place {
  let place
  try {
    place = getPlaceAfterEat(from.point, to.point, board)
  } catch (ex) {
    if (ex instanceof TypeError) {
      place = undefined
    } else {
      throw ex
    }
  }

  if(place === undefined || !place.isEmpty()) {
    throw new InvalidPlayException("Place doesn't exists")
  }

  return place
 }

function getPlaceAfterEat (from : Point,
                            to : Point,
                            board : Place[][]) : Place {
  if (from.isLongDiagonTopRight(to)) return board[to.x - 1][to.y + 1]
  if (from.isLongDiagonTopLeft(to)) return board[to.x - 1][to.y - 1]
  if (from.isLongDiagonBotRight(to)) return board[to.x + 1][to.y + 1]
  if (from.isLongDiagonBotLeft(to)) return board[to.x + 1][to.y - 1]
  throw new InvalidPlayException("Place doesn't exists")
}

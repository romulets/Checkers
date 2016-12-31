import Place from '../Models/Place'
import Point from '../Models/Point'
import InvalidPlayException from '../Exceptions/InvalidPlayException'

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
export function isAdvancingPlace (from : Place, to : Place) : boolean {
  if (from === null || from.isEmpty() || from.equalsTo(to)) return false

  let fromPoint = from.point
  let toPoint = to.point

  if (from.piece.isQueen) return fromPoint.isLongDiagon(toPoint)
  if (from.piece.player.moveFoward) return fromPoint.isTop(toPoint)
  else return fromPoint.isBot(toPoint)
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
  if (from.isTopRight(to)) return board[to.x + 1][to.y - 1]
  if (from.isTopLeft(to)) return board[to.x + 1][to.y + 1]
  if (from.isBotRight(to)) return board[to.x - 1][to.y - 1]
  else return board[to.x - 1][to.y + 1]
}

import Place from '../Models/Place'
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
export function isMoveToTopRight (from : Place, to : Place) : boolean {
  return from.X === to.X - 1 && from.Y === to.Y + 1
}

/**
 * @function
 */
export function isMoveToTopLeft (from : Place, to : Place) : boolean {
  return from.X === to.X - 1 && from.Y === to.Y - 1
}

/**
 * @function
 */
export function isMoveToBotRight (from : Place, to : Place) : boolean {
  return from.X === to.X + 1 && from.Y === to.Y + 1
}

/**
 * @function
 */
export function isMoveToBotLeft (from : Place, to : Place) : boolean {
  return from.X === to.X + 1 && from.Y === to.Y - 1
}

/**
 * @function
 */
export function isAdvancingPlace (from : Place, to : Place) : boolean {
  if (from === null || from.isEmpty() || from.equalsTo(to)) return false

  if (from.piece.isQueen) {
    return isMoveToTopRight(from, to) || isMoveToTopLeft(from , to) ||
      isMoveToBotRight(from, to) || isMoveToBotLeft(from, to)
  } else if (from.piece.player.moveFoward) {
    return isMoveToTopRight(from, to) || isMoveToTopLeft(from , to)
  } else {
      return isMoveToBotRight(from, to) || isMoveToBotLeft(from, to)
  }
}

/**
 * @function
 */
export function indentifyNextPlaceAfterEat (from : Place, to : Place,
                                    board : Place[][]) : Place {
  let place

  try {
    place = getPlaceAfterEat(from, to, board)
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

function getPlaceAfterEat (from : Place, to : Place, board : Place[][]) : Place {
  let place
  if (isMoveToTopRight(from, to)) {
    place = board[to.X + 1][to.Y - 1]
  } else if (isMoveToTopLeft(from, to)) {
    place = board[to.X + 1][to.Y + 1]
  } else if (isMoveToBotRight(from, to)) {
    place = board[to.X - 1][to.Y - 1]
  } else {
    place = board[to.X - 1][to.Y + 1]
  }
  return place
}

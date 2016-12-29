import Place from '../Models/Place'

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
  if (from === null || from.isEmpty()) return false
  if (from.piece.isQueen) return true

  if (from.piece.player.moveFoward) {
    return isMoveToTopRight(from, to) || isMoveToTopLeft(from , to)
  } else {
      return isMoveToBotRight(from, to) || isMoveToBotLeft(from, to)
  }
}

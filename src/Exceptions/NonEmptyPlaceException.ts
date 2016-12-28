import InvalidPlayException from './InvalidPlayException'
import Place from '../Models/Place'

export default class NonEmptyPlaceException extends InvalidPlayException {

  public name : string = 'NonEmptyPlaceException'
  private _place : Place

  public constructor (place : Place) {
    super(`The place ${place.toString()} isn't empty`)
    this._place = place
  }

}

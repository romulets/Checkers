import Place from './Place'
import { PlayStatus } from './PlayStatus'

export default class PlayResponse {

  private _selectedPlace : Place
  private _playStatus : PlayStatus

  constructor (playStatus : PlayStatus, selectedPlace? : Place) {
    this._playStatus = playStatus
    this._selectedPlace = selectedPlace || null
  }

  /* Getters and Setters */

  get selectedPlace () : Place {
    return this._selectedPlace
  }

  get playStatus () : PlayStatus {
    return this._playStatus
  }

  /* Methods */

  public static invalid () : PlayResponse {
    return new PlayResponse(PlayStatus.INVALID)
  }

  public static finished () : PlayResponse{
    return new PlayResponse(PlayStatus.FINISHED)
  }

  public static stillHappening (selectedPlace? : Place) : PlayResponse {
    return new PlayResponse(PlayStatus.STILL_HAPPENING, selectedPlace)
  }
}

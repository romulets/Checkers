import PlayResponse from '../Models/PlayResponse'

export interface Action {
    canPerform() : boolean
    perform () : PlayResponse
}

import { ACTIONS } from './actions'

export function userReducer(state = null, { type, payload } = null) {
    switch (type) {
        case ACTIONS.LOG_IN:
            return payload.currentUser
        case ACTIONS.LOG_OUT:
            return null
        default:
            return state
    }
}
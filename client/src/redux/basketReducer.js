import { ACTIONS } from "./actions"

export function basketReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.FETCH_BASKET:
            return payload.basket
        case ACTIONS.EMPTY_BASKET:
            return []
        default:
            return state
    }
}
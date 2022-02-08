import { ACTIONS } from "./actions"

export function basketReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.FETCH_BASKET:
            return payload.basket
        default:
            return state
    }
}
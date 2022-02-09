import { ACTIONS } from './actions'

export function productsReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.FETCH_PRODUCTS:
            return payload.products
        default:
            return state
    }
}
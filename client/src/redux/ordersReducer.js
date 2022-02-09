import { ACTIONS } from "./actions";

export function ordersReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.GET_ORDERS:
            return payload.orders
        default:
            return state
    }
}

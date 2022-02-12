import { ACTIONS } from "./actions"

export function articlesReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.GET_ARTICLES:
            return payload.articles
        default:
            return state
    }
}
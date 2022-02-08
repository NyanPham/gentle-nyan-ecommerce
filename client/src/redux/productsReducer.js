import { ACTIONS } from './actions'


const initialState = {
    shirts: []
}


export function productsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.FETCH_PRODUCTS:
            return {
                ...state,
                shirts: payload.shirts
            }
        
        default:
            return state
    }
}
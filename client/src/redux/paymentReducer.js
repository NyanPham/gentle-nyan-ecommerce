import { ACTIONS } from "./actions"

const initialState = {
    loading: false,
    successMessage: '',
    error: ''
}

export function paymentReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.PAYMENT_START: 
            return {
                ...state,
                loading: true,
                successMessage: '',
                error: ''
            }
        case ACTIONS.PAYMENT_SUCCESSS:
            return {
                ...state,
                loading: false,
                successMessage: 'Your transaction was successfull',
                error: ''
            }
        case ACTIONS.PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: '',
                error: 'Your transaction was not successfull'
            }
        default:
            return state
    }
}
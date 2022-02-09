import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'
import { userReducer } from './userReducer'
import { signUpReducer } from './signUpReducer'
import { logInReducer } from './logInReducer'
import { resetPasswordReducer } from './resetPasswordReducer'
import { basketReducer } from './basketReducer'
import { ordersReducer } from './ordersReducer'
import toastsReducer from './toastsReducer'

const allReducers = combineReducers({
    products: productsReducer,
    signUpStatus: signUpReducer,
    logInStatus: logInReducer,
    resetPasswordStatus: resetPasswordReducer,
    basket: basketReducer,
    currentUser: userReducer,
    orders: ordersReducer,
    toasts: toastsReducer
})


export default allReducers
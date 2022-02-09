import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'
import { userReducer } from './userReducer'
import { signUpReducer } from './signUpReducer'
import { logInReducer } from './logInReducer'
import { resetPasswordReducer } from './resetPasswordReducer'
import { basketReducer } from './basketReducer'
import { ordersReducer } from './ordersReducer'

const allReducers = combineReducers({
    products: productsReducer,
    basket: basketReducer,
    currentUser: userReducer,
    orders: ordersReducer,
    signUpStatus: signUpReducer,
    logInStatus: logInReducer,
    resetPasswordStatus: resetPasswordReducer
})


export default allReducers
import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'
import { userReducer } from './userReducer'
import { signUpReducer } from './signUpReducer'
import { logInReducer } from './logInReducer'

const allReducers = combineReducers({
    products: productsReducer,
    currentUser: userReducer,
    signUpStatus: signUpReducer,
    logInStatus: logInReducer,
})


export default allReducers
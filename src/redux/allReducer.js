import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'
import { userReducer } from './userReducer'

const allReducers = combineReducers({
    products: productsReducer,
    currentUser: userReducer,
})


export default allReducers
import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'


const allReducers = combineReducers({
    products: productsReducer
})


export default allReducers
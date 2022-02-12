import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'
import { userReducer } from './userReducer'
import { signUpReducer } from './signUpReducer'
import { logInReducer } from './logInReducer'
import { resetPasswordReducer } from './resetPasswordReducer'
import { basketReducer } from './basketReducer'
import { ordersReducer } from './ordersReducer'
import toastsReducer from './toastsReducer'
import { paymentReducer } from './paymentReducer'
import { addArticleReducer } from './addArticleReducer'
import { articlesReducer } from './articlesReducer'

const allReducers = combineReducers({
    products: productsReducer,
    signUpStatus: signUpReducer,
    logInStatus: logInReducer,
    resetPasswordStatus: resetPasswordReducer,
    basket: basketReducer,
    currentUser: userReducer,
    orders: ordersReducer,
    toasts: toastsReducer,
    paymentStatus: paymentReducer,
    addArticleStatus: addArticleReducer,
    articles: articlesReducer,
})


export default allReducers
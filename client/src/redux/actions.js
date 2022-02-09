import { db, auth } from '../firebase'
import { 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    query, 
    where, 
    onSnapshot, 
    orderBy, 
    serverTimestamp, 
    deleteDoc
} from 'firebase/firestore' 
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail } from 'firebase/auth'
import { formatDoc, formatDocs } from '../helper'

export const ACTIONS = {
    FETCH_PRODUCTS: 'fetch-products',
    FETCH_BASKET: 'add-to-basket',
    EMPTY_BASKET: 'empty-basket',

    SIGN_UP: 'sign-up',
    LOG_IN: 'sign-in',
    LOG_OUT: 'sign-out',

    SIGN_UP_START: 'sign-up-start',
    SIGN_UP_SUCCESS: 'sign-up-success',
    SIGN_UP_ERROR: 'sign-up-error',
    SET_SIGN_UP_ERROR: 'set-sign-up-error',

    LOG_IN_START: 'start-login-in',
    LOG_IN_SUCCESS: 'logged-in',
    LOG_IN_ERROR: 'failed-log-in',
    SET_LOG_IN_ERROR: 'set-log-in-error',

    RESET_PASSWORD_START: 'start-reset-password',
    RESET_PASSWORD_SUCCESS: 'success-reset-password',
    RESET_PASSWORD_ERROR: 'failed-reset-password',

    GET_ORDERS: 'get-order',

    ADD_TOAST: 'add-toast',
    DELETE_TOAST: 'delete-toast'
}

export function fetchProducts() {
    return async function (dispatch) {

        const itemsRef = collection(db, 'items')

        getDocs(itemsRef).then(res => {
            dispatch({
                type: ACTIONS.FETCH_PRODUCTS,
                payload: {
                    products: formatDocs(res.docs)
                }
            })
        })
    }
}

export function addToBasket(userId, productId, {name, imageURL, price}, chosenColor, chosenSize, amount) {
    return async function (dispatch) {
        const addBasketDoc = collection(db, 'baskets')
        await addDoc(addBasketDoc, {
            userId,
            productId,
            name: name,
            imageURL: imageURL,
            chosenColor,
            chosenSize,
            amount,
            price,
            createdAt: serverTimestamp()
        })
        dispatch(fetchBasket(userId))
        dispatch(addToast(name, imageURL, chosenColor, chosenSize, amount, price))
    }
}

function addToast(name, imageURL, chosenColor, chosenSize, amount, price) {
    return {
        type: ACTIONS.ADD_TOAST,
        payload: {
            newToast: {
                name,
                imageURL,
                chosenColor,
                chosenSize,
                amount, 
                price,
                toastedAt: Date.now()
            }
        }
    }
}

export function fetchBasket(userId) {
    return async function (dispatch) {
        const q = query(collection(db, 'baskets'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
        onSnapshot(q, snapshot=> {
            const basket = snapshot.docs.map(formatDoc)
            dispatch({
                type: ACTIONS.FETCH_BASKET,
                payload: { basket }
            })
        })
    }
}

export function adjustItemAmountInBasket(inBasketItemId, userId, newAmount) {
    return async function (dispatch) {
        const itemInBasketRef = doc(db, 'baskets', inBasketItemId)
        await updateDoc(itemInBasketRef, {
            amount: newAmount
        })
        dispatch(fetchBasket(userId))
    }
}

export function removeItemFromBasket(inBasketItemId, userId) {
    return async function (dispatch) {
        const itemInBasketRef = doc(db, 'baskets', inBasketItemId)
        await deleteDoc(itemInBasketRef)
        dispatch(fetchBasket(userId))
    }
}

export function emptyBasket(userId) {
    return async function (dispatch) {
        const itemsInBasketQuery = query(collection(db, 'baskets'), where('userId', '==', userId))
        const snapshot = await getDocs(itemsInBasketQuery)
        const itemsInBasket = snapshot.docs.map(formatDoc)
        
        for (let item of itemsInBasket) {
            const docRef = doc(db, 'baskets', item.id)
            await deleteDoc(docRef)
        }

        dispatch({
            type: ACTIONS.EMPTY_BASKET
        })
    }
}

export function fetchOrders(userId) {
    return async function (dispatch) {
        const q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
        onSnapshot(q, snapshot => {
            const orders = snapshot.docs.map(formatDoc)
            
            if (orders?.length === 0) return dispatch({
                type: ACTIONS.GET_ORDERS,
                payload: {
                    orders: []
                }
            })

            dispatch({
                type: ACTIONS.GET_ORDERS,
                payload: {
                    orders
                }
            })
        })
    }
}



export function signUp(email, password) {
    return async function (dispatch) {    
        try {
            dispatch({
                type: ACTIONS.SIGN_UP_START
            })
            await createUserWithEmailAndPassword(auth, email, password)
            dispatch({
                type: ACTIONS.SIGN_UP_SUCCESS
            })
        } catch {
            dispatch({
                type: ACTIONS.SIGN_UP_ERROR
            })
        }
    }
}

export function setSignUpError(errorMessage) {
    return {
        type: ACTIONS.SET_SIGN_UP_ERROR,
        payload: { error: errorMessage }
    }
}

export function logIn(email, password) {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTIONS.LOG_IN_START
            })
            await signInWithEmailAndPassword(auth, email, password)
            dispatch({
                type: ACTIONS.LOG_IN_SUCCESS
            })
        } catch {
            dispatch({
                type: ACTIONS.LOG_IN_ERROR
            })
        }
    }
}

export function logOut() {
    return async function (dispatch) {
        await signOut(auth)
    }
}

export function resetPassword(email) {
    return async function (dispatch) {
        try {
            dispatch({ type: ACTIONS.RESET_PASSWORD_START })
            await sendPasswordResetEmail(auth, email)
            dispatch({ type: ACTIONS.RESET_PASSWORD_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.RESET_PASSWORD_ERROR })
        }
    }
}


export function createAnOrder({ basket, created, amount, orderId, userId }) {
    return async function (dispatch) {
        const orderDoc = collection(db, 'orders')
        await addDoc(orderDoc, {
            userId,
            orderId,
            amount, 
            createdAt: created,
            items: basket
        })
    }
}

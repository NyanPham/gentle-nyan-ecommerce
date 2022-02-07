import { db, auth } from '../firebase'
import { collection, getDocs } from 'firebase/firestore' 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { formatDocs } from '../helper'


export const ACTIONS = {
    FETCH_PRODUCTS: 'fetch-products',
    SIGN_UP: 'sign-up',
    LOG_IN: 'sign-in',
    LOG_OUT: 'sign-out'
}

export function fetchProducts() {
    return function (dispatch) {
        const docRef = collection(db, 'shirts')
        getDocs(docRef).then(res => {
            dispatch({
                type: ACTIONS.FETCH_PRODUCTS,
                payload: {
                    shirts: formatDocs(res.docs)
                }
            })
        })
    }
}

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

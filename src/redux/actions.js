import { db, auth } from '../firebase'
import { collection, getDocs } from 'firebase/firestore' 
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged } from 'firebase/auth'
import { formatDocs } from '../helper'

export const ACTIONS = {
    FETCH_PRODUCTS: 'fetch-products',
    SIGN_UP: 'sign-up',
    LOG_IN: 'sign-in',
    LOG_OUT: 'sign-out',

    SIGN_UP_START: 'sign-up-start',
    SIGN_UP_SUCCESS: 'sign-up-success',
    SIGN_UP_ERROR: 'sign-up-error',
    SET_SIGN_UP_ERROR: 'set-sign-up-error',

    LOG_IN_START: 'start-login-in',
    LOG_IN_SUCCESS: 'logged-in',
    LOG_IN_ERROR: 'failed-log-ing',
    SET_LOG_IN_ERROR: 'set-log-in-error'
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
    return async function (dispatch) {    
        try {
            dispatch({
                type: ACTIONS.SIGN_UP_START
            })
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore' 
import { formatDocs } from '../helper'

export const ACTIONS = {
    FETCH_PRODUCTS: 'fetch-products',
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
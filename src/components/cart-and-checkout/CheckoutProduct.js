import React from 'react';
import { adjustItemAmountInBasket, removeItemFromBasket } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux'

export default function CheckoutProduct(props) {
    const {
        inBasketItemId,
        imageURL,
        name,
        color,
        size,
        amount, 
        price
    } = props

    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    function handleAmountChange(e) {
        if (e.target.name === 'increment') return dispatch(adjustItemAmountInBasket(inBasketItemId, currentUser?.uid, amount + 1))
        if (e.target.name === 'decrement' && amount - 1 >= 1) return dispatch(adjustItemAmountInBasket(inBasketItemId, currentUser.uid, amount - 1))
        if (e.target.value < 1) return 
        dispatch(adjustItemAmountInBasket(inBasketItemId, currentUser.uid, parseInt(e.target.value)))
    }

    function handleRemoveItemClick() {
        dispatch(removeItemFromBasket(inBasketItemId, currentUser?.uid))
    }

    return (
        <div className="grid grid-cols-5 gap-4 justify-between items-center mt-4">
            <div className="h-36 w-36">
                <img className="max-w-full max-h-full" src={imageURL} alt={name}/>
            </div>
            <div className="col-span-2">
                <p className="text-gray-700 text-base">{name} - {color} - {size} </p>
                <button 
                    className="py-1 px-2 bg-white border border-gray-700 text-sm text-gray-900 rounded-md mt-3 hover:bg-gray-900 hover:text-white transition active:ring active:ring-gray-700"
                    onClick={handleRemoveItemClick}
                >
                    Remove from cart
                </button>
            </div>
            <div className="flex space-x-2">
                <button onClick={handleAmountChange} name="decrement">-</button>
                <input 
                    className="w-8 flex bg-gray-200 border border-gray-900 text-center rounded-sm outline-none focus:ring focus:ring-sky-300"
                    type="text" 
                    value={amount} 
                    onChange={handleAmountChange}
                />
                <button onClick={handleAmountChange} name="increment">+</button>
            </div>
            <p className="text-sky-800 text-base">VND {price * amount}</p>
        </div>
    )
}

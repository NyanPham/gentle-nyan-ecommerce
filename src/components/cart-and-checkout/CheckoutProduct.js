import React from 'react';

export default function CheckoutProduct(props) {
    const {
        id,
        imageURL,
        name,
        color,
        size,
        amount, 
        price
    } = props

    return (
        <div className="p-4 flex gap-4 justify-between items-center">
            <div className="h-32 w-32">
                <img src={imageURL} alt={name}/>
            </div>
            <div>
                <p className="text-gray-700 text-lg">{name} - {color} - {size} </p>
                <button className="py-1 px-2 bg-white border border-gray-700 text-gray-900 rounded-md mt-3 hover:bg-gray-900 hover:text-white transition active:ring active:ring-gray-700">Remove from cart</button>
            </div>
            <div className="flex space-x-2">
                <button>-</button>
                <input 
                    className="w-8 flex bg-gray-200 border border-gray-900 text-center rounded-sm outline-none focus:ring focus:ring-sky-300"
                    type="text" 
                    value={amount} 
                />
                <button>+</button>
            </div>
            <p className="text-sky-800 text-lg">VND {price * amount}</p>
        </div>
    )
}

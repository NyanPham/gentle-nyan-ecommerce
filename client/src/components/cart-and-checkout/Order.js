import React from 'react';
import CheckoutProduct from './CheckoutProduct';

export default function Order({ createdAt, amount, items, orderId }) {
    const date = new Date(createdAt * 1000)
    return (
        <div className="w-3/5 p-6 mx-auto bg-white rounded-sm shadow-sm">
            <h3 className="flex justify-between items-end font-bold text-gray-900 text-xl">Order <span className="text-slate-500 text-sm font-thin">{orderId}</span></h3>
            <p className="mt-6">Time: {date.toLocaleString()}</p>
            <p className="mt-6">Total: <span>VND {amount}</span></p>
            <div className="mt-8">
                {items.map((item, index) => (
                    <CheckoutProduct 
                        key={`ordered_item_${item.id}_${index}`}
                        imageURL={item.imageURL}
                        name={item.name}
                        color={item.chosenColor}
                        size={item.size}
                        amount={item.amount}
                        price={item.price}
                        disabled={true}
                    />
                ))}
            </div>
        </div>
    )
}

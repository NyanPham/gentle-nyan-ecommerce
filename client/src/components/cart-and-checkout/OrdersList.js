import React from 'react';
import Order from './Order';
import { useSelector } from 'react-redux';

export default function OrdersList() {
    const orders = useSelector(state => state.orders)

    return (
        <section className='space-y-8 pb-8'>
            <h2 className="text-3xl text-gray-900 text-center font-bold mt-8">Your Orders</h2>
            {orders?.map((order, index) => (
                <Order 
                    key={`order_history_${index}`}
                    {...order}
                />
            ))}
        </section>
    )
}
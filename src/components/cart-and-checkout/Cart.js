import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import { getTotalBasket } from '../../helper';
import { BENEFITS } from '../IntroGrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux'

export default function Cart() {
    const basket = useSelector(state => state.basket)

    return (
        <section className="p-8 bg-white">
            <div className="flex flex-row gap-3 items-center">
                <h2 className="text-2xl font-normal">Your Cart</h2>
                <p className="text-gray-400 text-slate-500">(<span>2</span> items in your cart)</p>
            </div>
            <div className="mt-4 flex gap-16">
                <div className="grow">
                    {basket.map(item => (
                        <CheckoutProduct 
                            key={`cart-item_${item.productId}`}
                            id={item.id}
                            imageURL={`https://${item.imageURL}`}
                            name={item.name}
                            color={item.chosenColor}
                            size={item.chosenSize}
                            price={item.price}
                            amount={item.amount}
                        />
                    ))}
                    {/* <CheckoutProduct 
                        id="12334445555"
                        imageURL="https://m.media-amazon.com/images/I/71JfOX0yHMS._AC_UX522_.jpg"
                        name="DRAY"
                        color="blue"
                        size="M"
                        amount={2} 
                        price={15000}
                    /> */}
                    
                </div>
                    
                {/* right */}
                <div className="">
                    <div className="py-4 px-6 bg-gray-400 rounded-sm">
                        <h3 className="uppercase text-gray-900 text-lg">Your order</h3>
                        <p className="text-slate-700 mt-1">Vat included</p>
                        <div className="mt-2 flex justify-between items-center font-bold text-lg text-gray-900">
                            Total:
                            <span>VND {getTotalBasket(basket)}</span>
                        </div>
                        <button className="w-full mt-2 py-2 text-center text-gray-200 bg-gray-900 rounded-md hover:bg-gray-800 active:ring active:ring-gray-200 transition">Proceed to checkout</button>
                    </div>
                    <div className="mt-4 flex flex-col items-start">
                        {BENEFITS.map((benefit, index) => {
                            return <SmallBenefit key={`smallBenefit_${index}`} {...benefit} />
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

function SmallBenefit({ icon, name, description }) {
    return (
        <div className="p-2 flex justify-center items-center gap-4">
            <FontAwesomeIcon icon={icon} className="text-xl text-gray-500" />
            <div>
                <h3 className="text-gray-500 font-bold text-sm">{name}</h3>
                <p className="text-gray-500 text-normal font-xs">{description}</p>
            </div>
        </div>
    )
}


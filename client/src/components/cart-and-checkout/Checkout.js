import React, { useState, useRef, useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct'
import { useSelector, useDispatch } from 'react-redux'
import { getTotalBasket } from '../../helper'
import TextInput from '../TextInput'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import { createAnOrder, emptyBasket } from '../../redux/actions';

const initialUserInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
}

const fields = {
    name: false,
    email: false,
    phone: false,
    address: false,
}

export default function Checkout() {
    const basket = useSelector(state => state.basket)
    const currentUser = useSelector(state => state.currentUser)
    const submitBtnRef = useRef()
    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const [validFields, setValidFields] = useState(fields)
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handlePayment(e) {
        e.preventDefault()
        if (!stripe) return

        let isValid = true
        const fields = [...Object.keys(validFields)]
        fields.forEach(field => {
            if (!validFields[field]) isValid = false
        })
        if (!isValid) return

        const checkoutItems = basket.map(item => {
            return {
                id: item.id,
                amount: item.amount, 
                price: item.price
            }
        })

        const response = await fetch('http://localhost:4242/make-payment-intent', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({checkoutItems})
        })
        const {clientSecret} = await response.json()

        if (!clientSecret) return
        
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            dispatch(createAnOrder({
                basket,
                userId: currentUser.uid, 
                orderId: paymentIntent.id,
                created: paymentIntent.created,
                amount: paymentIntent.amount, 
            }))
            dispatch(emptyBasket(currentUser.uid))
            navigate('/checkout/payment-success')
        }).catch((err) => {
            console.error(err.error)
            navigate('/checkout/payment-failure')
        })

    }

    function handleInputChange(e) {
        setUserInfo(prevUserInfo => {
            return {
                ...prevUserInfo,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleCardChange(e) {
        e.preventDefault()
    }
    

    return (
        <section className="p-8 bg-white flex flex-col gap-8 lg:flex-row">
            <div className="items-center lg:w-2/4">
                <h2 className="text-2xl font-normal">Your Cart</h2>
                <p className="text-gray-400 text-slate-500">
                    (
                        <span className="underline font-bold">
                            {basket.length}
                        </span> {basket.length === 1 ? 'item' : 'items'} in your cart
                    )
                </p>
                <form onSubmit={handlePayment}>
                    <div className="form-group">
                        <label className="label" htmlFor="name">Your name</label>
                        <TextInput 
                            placeholder="eg.Jack Shepherd"
                            type="text"
                            name="name"
                            value={userInfo.name}
                            handleInputChange={handleInputChange}
                            required={true}
                            validation={{
                                validate: (value) => value.length > 7 && value.length < 20,
                                errorMessage: 'Your name must be from 7 to 20 characters'
                            }}
                            setValidFields={setValidFields}
                        />
                    </div>
                    <div className="form-group flex flex-row gap-4">
                        <div>
                            <label className="label" htmlFor="email">Your email</label>
                            <TextInput 
                                placeholder="eg.you@website.com"
                                type="email"
                                name="email"
                                value={userInfo.email}
                                handleInputChange={handleInputChange}
                                required={true}
                                validation={{
                                    validate: (value) => value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
                                    errorMessage: 'Invalid email address'
                                }}
                                setValidFields={setValidFields}
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="phone">Your number</label>
                            <TextInput 
                                placeholder="eg.7777-777-777"
                                type="tel"
                                name="phone"
                                value={userInfo.phone}
                                handleInputChange={handleInputChange}
                                required={true}
                                validation={{
                                    validate: (value) => /[0-9]{4}-[0-9]{3}-[0-9]{3}/.test(value),
                                    errorMessage: 'Invalid phone number'
                                }}
                                setValidFields={setValidFields}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="name">Your address</label>
                        <TextInput 
                            placeholder="eg.District 1, HCMC"
                            type="text"
                            name="address"
                            value={userInfo.address}
                            handleInputChange={handleInputChange}
                            required={true}
                            validation={{
                                validate: (value) => value.length > 10,
                                errorMessage: 'Please reenter your address'
                            }}
                            setValidFields={setValidFields}
                        />
                    </div>
                    <div className="mt-8 p-6 border border-slate-500 rounded-lg">
                        <label htmlFor='card-element mb-6'>Your card number</label>
                        <CardElement onChange={handleCardChange}/>
                    </div>
                    <button type="submit" ref={submitBtnRef} hidden={true} />
                </form>
            </div>
            <div className="flex flex-col space-y-4 lg:w-2/4">
                <div>
                    {basket?.map((item, index) => (
                        <CheckoutProduct 
                            key={`checkout_item${item.productId}_${index}`}
                            inBasketItemId={item.id}
                            imageURL={item.imageURL}
                            name={item.name}
                            color={item.chosenColor}
                            size={item.chosenSize}
                            amount={item.amount}
                            price={item.price}
                            isOnPayment={true}
                        />
                    ))}
                </div>
                <div className="flex justify-between font-bold text-gray-900">
                    <p>Gross total:</p>
                    <p>VND {getTotalBasket(basket)}</p>
                </div>
                <button
                    className="submit-button"
                    onClick={() => submitBtnRef.current.click()}
                >
                    Own now
                </button>
            </div>
        </section>
    )
    
}
import React, { useState, useRef } from 'react';
import CheckoutProduct from './CheckoutProduct'
import { useSelector } from 'react-redux'
import { getTotalBasket } from '../../helper'
import TextInput from '../TextInput'

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
    const submitBtnRef = useRef()
    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const [validFields, setValidFields] = useState(fields)

    function handlePayment(e) {
        e.preventDefault()
        let isValid = true
        const fields = [...Object.keys(validFields)]
        fields.forEach(field => {
            if (!validFields[field]) isValid = false
        })

        if (isValid) {
            ///handle logic to charge user
        }
    }

    function handleInputChange(e) {
        setUserInfo(prevUserInfo => {
            return {
                ...prevUserInfo,
                [e.target.name]: e.target.value
            }
        })
    }
    

    return (
        <section className="p-8 bg-white flex gap-8">
            <div className="w-2/4 items-center">
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
                    <div className="form-group">
                        <label className="label" htmlFor="name">Pay method</label>
                        <input 
                            className="text-input" 
                            type="text" 
                            placeholder='eg.Credit card' 
                            required
                        />
                    </div>
                    <button type="submit" ref={submitBtnRef} hidden={true} />
                </form>
            </div>
            <div className="w-2/4 flex flex-col space-y-4">
                <div>
                    {basket?.map((item, index) => (
                        <CheckoutProduct 
                            key={`checkout_item${item.productId}_${index}`}
                            inBasketItemId={item.id}
                            imageURL={`https://${item.imageURL}`}
                            name={item.name}
                            color={item.chosenColor}
                            size={item.chosenSize}
                            amount={item.amount}
                            price={item.price}
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

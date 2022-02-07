import React, { useState, useEffect } from 'react';
import ProductPreview from './ProductPreview';
import { fetchProducts } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'

export default function FeaturedProducts() {
    const products = useSelector(state => state.products.shirts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    console.log(products)
    return (
        <div className="py-8 px-16 min-h-screen bg-gray-200">
            <h2 className="text-center text-3xl mt-4">Featured products</h2>
            <div className="flex gap-4 justify-evenly items-center flex-wrap mt-8">
                {products.length > 0 && (
                    products.map(item => (
                        <ProductPreview key={item.code} {...item}/>
                    ))
                )}
            </div>
        </div>
    )
}

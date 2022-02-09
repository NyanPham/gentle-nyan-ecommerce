import React, { useState, useEffect } from 'react';
import ProductPreview from './ProductPreview';
import { fetchProducts } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { shuffle } from '../helper';

export default function FeaturedProducts() {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const featuredProducts = products
                                .filter(product => product.onSale 
                                        || product.inNewCollection 
                                        || product.inNewArrival
    )
    const randomChosenProducts = shuffle(featuredProducts).slice(0, 8)
    return (
        <div className="py-8 px-16 min-h-screen bg-gray-200">
            <h2 className="text-center text-3xl mt-4">Featured products</h2>
            <div className="flex gap-4 justify-evenly items-center flex-wrap mt-8">
                {randomChosenProducts.length > 0 && (
                    randomChosenProducts.map((item, index) => (
                        <ProductPreview key={`${item.code}_${index}`} {...item}/>
                    ))
                )}
            </div>
        </div>
    )
}

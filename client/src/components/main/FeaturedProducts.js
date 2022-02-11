import React, { useState, useEffect } from 'react';
import ProductPreview from './ProductPreview';
import { useSelector, useDispatch } from 'react-redux'
import { shuffle } from '../../helper';
import { Link } from 'react-router-dom'
import { pageTransitionClick } from '../../header/Navbar';

export default function FeaturedProducts() {
    const products = useSelector(state => state.products)

    const featuredProducts = products
                                .filter(product => product.onSale 
                                        || product.inNewCollection 
                                        || product.inNewArrival
    )
    
    const randomChosenProducts = shuffle(featuredProducts).slice(0, 8)

    return (
        <div className="showroom" id="featured-products">
            <h2 className="text-center text-3xl text-gray-900 uppercase tracking-wide font-bold mt-3">Featured products</h2>
            <div className="product-grid">
                {randomChosenProducts?.length > 0 && (
                    randomChosenProducts?.map((item, index) => (
                        <ProductPreview key={`${item.code}_${index}`} {...item}/>
                    ))
                )}
            </div>
            <Link to="/items/all-products" className='w-fit mx-auto'>
                <button  className="show-btn" onClick={pageTransitionClick}>Show All</button>
            </Link>
        </div>
    )
}

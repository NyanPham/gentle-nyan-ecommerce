import React from 'react';
import weekendBannerImage from '../assets/weekend-banner.png'
import { useSelector } from 'react-redux'
import ProductPreview from './ProductPreview';

export default function NewArrival() {
    const products = useSelector(state => state.products.shirts)
    const newArrivals = products?.filter(product => product.inNewArrival)

    return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-evenly items-center bg-blue-900">
                <div className="py-4 px-8">
                    <small className="text-blue-100 text-base">Special Promo</small>
                    <h2 className="text-blue-300 text-4xl font-bold mt-2 tracking-wide uppercase">Weekends Sale</h2>
                    <h3 className="text-blue-100 text-2xl mt-4 tracking-wide uppercase">Up to 50% off</h3>
                </div>
                <img src={weekendBannerImage} className="translate-y-4 max-h-52"/>
            </div>
            <div className="py-4 px-12">
                <h2 className="text-center text-3xl text-gray-900 uppercase tracking-wide font-bold mt-3">New Arrival</h2>
                <div>
                    {newArrivals.length > 0 && (
                        newArrivals.map(item => (
                            <ProductPreview key={item.code} {...item}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

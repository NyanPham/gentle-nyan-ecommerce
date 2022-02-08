import React from 'react'
import bannerImage from '../assets/man-banner.png'

export default function Hero() {
    return (
        <div className="p-8 flex w-100 max-h-96 justify-center items-center">
            <div className="space-y-4">
                <h1 className="text-6xl text-gray-900 font-bold leading-none">men's <br/> collection</h1>
                <p className="text-lg text-gray-900 font-normal">from t-shirt, jeans, jacket, watches, bags and sunglasses</p>
                <button 
                    className="py-4 px-6 bg-gray-900 text-white rounded font-bold hover:opacity-70 transition transform
                    focus:ring focus:ring-offset-2 focus:ring-gray-900"

                >SHOP NOW</button>
            </div>
            <div>
                <img className="-translate-y-14 pointer-events-none" src={bannerImage} />
            </div>
        </div>
    )
}
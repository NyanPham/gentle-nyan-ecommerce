import React from 'react'
import bannerImage from '../../assets/man-banner.png'

export default function Hero() {
    return (
        <div className="p-8 flex w-100 max-h-96 justify-center items-center">
            <div className="space-y-4">
                <h1 className="text-6xl text-gray-900 font-bold leading-none">men's <br/> collection</h1>
                <p className="text-lg text-gray-900 font-normal">from t-shirt, jeans, jacket, watches, bags and sunglasses</p>
                
                <button 
                    className="py-4 px-6 mt-4 bg-gray-900 text-white rounded font-bold hover:opacity-70 transition transform
                    focus:ring focus:ring-offset-2 focus:ring-gray-900"
                    onClick={() => {
                        const rect = document.getElementById('featured-products')?.getBoundingClientRect()
                        if (!rect) return
                        window.scrollTo({
                            top: rect.top,
                            behavior: 'smooth'
                        })
                    }}
                >SHOP NOW</button>
            </div>
            <div className="hidden md:inline-block">
                <img className="-translate-y-14 pointer-events-none" src={bannerImage} alt='banner'/>
            </div>
        </div>
        // <div className="flex w-100 h-96 justify-start items-center relative">
        //     <div className="space-y-4 z-20 ml-12">
        //         <h1 className="text-6xl text-gray-900 font-bold leading-none">men's <br/> collection</h1>
        //         <p className="text-lg text-gray-900 font-semibold">from t-shirt, jeans, jacket, watches, bags and sunglasses</p>
                
        //         <a href="#featured-products"><button 
        //             className="py-4 px-6 mt-4 bg-gray-900 text-white rounded font-bold hover:opacity-70 transition transform
        //             focus:ring focus:ring-offset-2 focus:ring-gray-900"

        //             >SHOP NOW</button>
        //         </a>
        //     </div>
        //     {/* <div className="hidden md:inline-block z-10">
        //         <img className="-translate-y-14 pointer-events-none" src={bannerImage} />
        //     </div> */}
        //     <img className="w-full h-full absolute z-0 object-cover" src={bannerBackground} style={{objectPosition: 'center 20%'}}/>
        //     <div className="w-full h-full absolute z-10 bg-gradient-to-r from-gray-600 to-gray-400 opacity-40"/>
        // </div>
    )
}
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkAlt } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {


    function handleNewsletterSub(e) {
        e.preventDefault()
    }

    return (
        <div className="py-8 px-12 grid grid-cols-1 gap-6 bg-blue-900 justify-evenly items-start md:grid-cols-2 lg:grid lg:grid-cols-4">
            <div>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Contact us</h2>
                <div className="space-y-4">
                    <p className="text-blue-400 text-sm">Binh Thanh Dist, HCM</p>
                    <p className="text-blue-400 text-sm">0947-xxx-xxx</p>
                    <p className="text-blue-400 text-sm">nhanphamdev@gmail.com</p>
                </div>
            </div>
            <div>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Products</h2>
                <div className="space-y-4 flex flex-col">
                    <a className="text-blue-400 text-sm w-max" href="#">Price Drop</a>
                    <a className="text-blue-400 text-sm w-max" href="#">New Arrival</a>
                    <a className="text-blue-400 text-sm w-max" href="#">Products</a>
                </div>
            </div>
            <div>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Our Company</h2>
                <div className="space-y-4 flex flex-col">
                    <a className="text-blue-400 text-sm w-max" href="#">Delivery</a>
                    <a className="text-blue-400 text-sm w-max" href="#">About us</a>
                    <a className="text-blue-400 text-sm w-max" href="#">Sitemap</a>
                </div>
            </div>
            <form onSubmit={handleNewsletterSub}>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Join our newsletter now</h2>
                <input
                    className="py-2 px-3 bg-transparent text-gray-100 text-base outline-none border border-blue-100 rounded-md focus:ring focus:ring-blue-100 transition" 
                    placeholder="Email Address"/>
                <button 
                    className="p-3 bg-gray-800 text-gray-100 ml-2 rounded-md hover:bg-gray-700 focus:bg-gray-900 tracking-wide transition"
                    type="submit"
                >GO</button>
            </form>
        </div>
    )
}

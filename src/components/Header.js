import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhoneVolume, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/nyan-logo.png'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const [error, setError] = useState('')

    function handleLogOut() {
        
    }

    return (
        <header className="w-100">
            <div className="px-8 py-4 flex justify-between w-100 bg-gray-800 text-white">
                <div className="flex space-x-2 items-center text-base">
                    <FontAwesomeIcon icon={faFacebookSquare} className="text-2xl"/>
                    <FontAwesomeIcon icon={faTwitterSquare} className="text-2xl"/>
                    <FontAwesomeIcon icon={faInstagramSquare} className="text-2xl"/>
                </div>
                <div className="flex gap-2">
                    <p className="mr-6">{currentUser?.email}</p>
                    {currentUser
                        ? (<button className='flex space-x-2 items-center text-base' onClick={handleLogOut}>
                                <FontAwesomeIcon icon={faUser} className="text-2xl"/>
                                <strong>Logout</strong>
                            </button>)
                        : (
                            <Link to='/login' className='flex space-x-2 items-center text-base'>
                                <FontAwesomeIcon icon={faUser} className="text-2xl"/>
                                <strong>Login</strong>
                            </Link>
                        )
                    }
                    
                </div>
                
            </div>
            <div className="px-8 py-4 bg-white flex justify-between items-center">
                <div className="flex flex-row gap-3">
                    <div className="text-base text-blue-300 flex justify-center items-center" >
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-3xl"/>
                    </div> 
                    <div className="flex flex-col">
                        <span className="text-base text-blue-300">Call us</span>
                        <p className="text-base text-gray-900">0947-xxx-xxx</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 relative text-center">
                    <div className="logo-container">
                        <img 
                            className=""
                            src={logo}
                            alt="Nyan's Logo" 
                        />
                    </div>
                    <p className="text-3xl font-md tracking-12 pt-5 z-10">GentleNyan</p>
                </div>
                <div className="flex flex-row gap-3">
                    <FontAwesomeIcon icon={faSearch} className="function-icon"/>
                    <FontAwesomeIcon icon={faShoppingCart} className="function-icon"/>
                </div>
            </div>
            <Navbar />
        </header>
    )
}

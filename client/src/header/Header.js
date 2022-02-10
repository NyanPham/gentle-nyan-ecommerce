import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhoneVolume, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/nyan-logo.png'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../redux/actions'

export default function Header() {
    const currentUser = useSelector(state => state.currentUser)
    const basket = useSelector(state => state.basket)
    const dispatch = useDispatch()

    function handleLogOut() {
        dispatch(logOut())
    }

    return (
        <header className="w-100 relative">
            <div className="px-8 py-4 flex justify-between w-100 bg-gray-800 text-white">
                <div className="hidden space-x-2 items-center text-base md:flex">
                    <FontAwesomeIcon icon={faFacebookSquare} className="text-2xl"/>
                    <FontAwesomeIcon icon={faTwitterSquare} className="text-2xl"/>
                    <FontAwesomeIcon icon={faInstagramSquare} className="text-2xl"/>
                </div>
                <div className="flex grow justify-between gap-2 md:justify-end items-center">
                    {currentUser && <Link to="/orders" className="mr-6">{currentUser?.email}</Link>}
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
                <div className="hidden flex-row gap-3 sm:flex">
                    <div className="text-base text-blue-300 flex justify-center items-center" >
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-3xl"/>
                    </div> 
                    <div className="flex flex-col">
                        <span className="text-base text-blue-300">Call us</span>
                        <p className="text-base text-gray-900">0947-xxx-xxx</p>
                    </div>
                </div>
                <Link to="/" className="flex flex-col gap-2 relative text-center hover:-translate-y-1">
                    <div className="hidden logo-container sm:inline-block">
                        <img 
                            className=""
                            src={logo}
                            alt="Nyan's Logo" 
                        />
                    </div>
                    <p className="text-3xl font-md tracking-12 pt-5 z-10">GentleNyan</p>
                </Link>
                <div className="flex flex-row gap-5">
                    <FontAwesomeIcon icon={faSearch} className="function-icon"/>
                    <Link to={`${currentUser ? '/cart' : '/login'}`} className="relative">
                        <FontAwesomeIcon icon={faShoppingCart} className="function-icon"/>
                        {currentUser && <div className="w-5 h-5 bg-gray-800 rounded-full flex justify-center items-center text-white text-sm absolute top-4 -left-2">
                            {basket?.length}
                        </div>}
                    </Link>
                </div>
            </div>
            <Navbar />
        </header>
    )
}

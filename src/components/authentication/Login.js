import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions';
import { auth } from '../../firebase'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)
    const navigate = useNavigate()

    function handleLogIn(e) {
        e.preventDefault()

    }

    return (
        <div className="py-8 px-16 bg-white h-screen text-center">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl text-gray-500 text-slate-500">GentleNyan</h2>
                <Link to="/signup" className="py-1.5 px-2.5 bg-sky-500 text-sm text-white rounded-sm hover:bg-sky-400 hover:-translate-y-2 hover:shadow-xl transform transition">
                    Sign Up
                </Link>
            </div>
            {currentUser?.email}
            <form className="text-center max-w-lg mx-auto mt-6" onSubmit={handleLogIn}>
                <h2 className="text-3xl text-gray-900 font-bold">Welcome!</h2>
                <h3 className="text-slate-500 mt-6">Enter your info below to login</h3>
                <div className="mt-6 flex flex-col justify-center items-start">
                    <label htmlFor="email" className="text-gray-700 text-lg">Your email</label>
                    <input 
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md outline-none focus:ring focus:ring-offset-1 focus:ring-sky-400" 
                        type="email" id="email" placeholder='eg.you@website.com' required={true}
                        ref={emailRef}
                    />
                </div>
                <div className="mt-6 flex flex-col justify-center items-start">
                    <label htmlFor="password" className="text-gray-700 text-lg">Your password</label>
                    <input 
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md outline-none focus:ring focus:ring-offset-1 focus:ring-sky-400"                     
                        type="password" id="password" placeholder="eg.yourpassword@a234^" required={true}
                        ref={passwordRef}
                    />
                </div>
                
                <button 
                    className="py-1.5 px-2.5 mt-8 mb-6 w-full bg-sky-500 text-lg text-white rounded-sm hover:bg-sky-400 focus:bg-sky-600 transition disabled:bg-slate-300"
                    type="submit"
                    disabled={true}
                >
                    Login
                </button>
            </form>
            <Link to="/forgot-password" className="text-slate-700 text-gray-600 hover:text-gray-500 focus:text-gray-700 disabled:bg-slate-300" disabled={true}>Forgot your password?</Link>
        </div>
    )
}

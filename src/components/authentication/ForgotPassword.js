import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions';
import { auth } from '../../firebase'

export default function ForgotPassword() {
    const emailRef = useRef()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()

    function handleResetPassword(e) {
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
            <form className="text-center max-w-lg mx-auto mt-6" onSubmit={handleResetPassword}>
                <h2 className="text-3xl text-gray-900 font-bold">Reset your password</h2>
                <h3 className="text-slate-500 mt-6">Forgot your password? Happens all the time. Enter your email below to reset it</h3>
                {message && <div className="text-green-500">{message}</div>}
                {error && <div className="text-red-500">{error}</div>}
                <div className="mt-6 flex flex-col justify-center items-start">
                    <label htmlFor="email" className="text-gray-700 text-lg">Your email</label>
                    <input 
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md outline-none focus:ring focus:ring-offset-1 focus:ring-sky-400" 
                        type="email" id="email" placeholder='eg.you@website.com' required={true}
                        ref={emailRef}
                    />
                </div>
                
                <button 
                    type="submit"
                    className="py-1.5 px-2.5 mt-8 mb-6 w-full bg-sky-500 text-lg text-white rounded-sm hover:bg-sky-400 focus:bg-sky-600 transition disabled:bg-slate-300"
                    disabled={true}
                >
                    Next
                </button>
            </form>
        </div>
    )
}

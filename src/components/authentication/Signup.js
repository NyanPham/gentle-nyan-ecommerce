import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const currentUser = useSelector(state => state.currentUser)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleCreateAccount(e) {
        e.preventDefault()

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setLoading(true)
            setError('')
            const authed = await signUp(emailRef.current.value, passwordRef.current.value)
            console.log(authed)
        } catch {
            setError('Failed to create account. Please try again later')
        }
        setLoading(false)
    }

    return (
        <div className="py-8 px-16 bg-white h-screen text-center">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl text-gray-500 text-slate-500">GentleNyan</h2>
                <Link to="/login" className="py-1.5 px-2.5 bg-sky-500 text-sm text-white rounded-sm hover:bg-sky-400 hover:-translate-y-2 hover:shadow-xl transform transition">
                    Login
                </Link>
            </div>
            <form className="text-center max-w-lg mx-auto mt-6">
                <h2 className="text-3xl text-gray-900 font-bold">Wanna join us?</h2>
                <h3 className="text-slate-500 mt-6">Enter your info below to create account</h3>
                {error && <p className="text-red-500 mt-6">{error}</p>}
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
                <div className="mt-6 flex flex-col justify-center items-start">
                    <label htmlFor="password-confirm" className="text-gray-700 text-lg">Confirm your password</label>
                    <input 
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md outline-none focus:ring focus:ring-offset-1 focus:ring-sky-400"                     
                        type="password" id="password-confirm" placeholder="eg.yourpassword@a234^" required={loading}
                        ref={passwordConfirmRef}
                    />
                </div>
                <button 
                    className="py-1.5 px-2.5 mt-8 mb-6 w-full bg-sky-500 text-lg text-white rounded-sm hover:bg-sky-400 focus:bg-sky-600 transition disabled:bg-slate-300"
                    onClick={handleCreateAccount}
                    disabled={loading}
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="p-3 sticky top-0 w-100 bg-white border border-slate-300 flex justify-evenly items-center">
            <NavLink className="navlink" to="/">Home</NavLink>
            <NavLink className="navlink" to="/">About us</NavLink>
            <NavLink className="navlink" to="/">New Collection</NavLink>
            <NavLink className="navlink" to="/">New Arrival</NavLink>
            <NavLink className="navlink" to="/">Blog</NavLink>
            <NavLink className="navlink" to="/">Contact us</NavLink>
        </div>
    )
}
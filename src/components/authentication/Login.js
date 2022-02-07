import React from 'react';

export default function Login() {
    return (
        <div>
            <div>
                <h2>GentleNyan</h2>
                <button>Sign Up</button>
            </div>
            <form>
                <h2>Welcome!</h2>
                <h3>Enter your info below to login</h3>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <button>Login</button>
            </form>
            <p>Forgot your password?</p>
        </div>
    )
}

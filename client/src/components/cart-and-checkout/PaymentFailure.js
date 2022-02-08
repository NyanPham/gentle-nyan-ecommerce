import React from 'react';

export default function PaymentFailure() {
    return (
        <section className="h-screen flex-center items-center bg-white">
            <div className="w-52 h-48 mx-auto mt-24">
                <h2>Failed to make transaction</h2>
                <p>
                    Please try again later
                </p>
            </div>
        </section>
    )
}

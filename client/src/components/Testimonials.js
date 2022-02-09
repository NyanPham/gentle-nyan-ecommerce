import React from 'react';
import james from '../assets/james.jpg'
import Testimonial from './Testimonial'

const TESTIMONIES = [
    {
        image: james,
        name: 'James Bars',
        text: 'Although I have bought clothes from this shop several times, I\'m always satisfied by their product quality and service. Really want to recommend you all to this shop.'
    }
]

export default function Testimonials() {
    return (
        <div className="bg-gray-200 py-10 px-8">
            <h2 className="my-4 text-3xl text-gray-900 text-center font-bold uppercase tracking-wide">Customer Testimonials</h2>
            {TESTIMONIES?.map(testimonial => (
                <Testimonial key={testimonial.name} {...testimonial}/>
            ))}
        </div>
    )
}

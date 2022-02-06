import React, { useState, useEffect } from 'react';
import ProductPreview from './ProductPreview';
import { db } from '../firebase'
import { getDocs, collection } from 'firebase/firestore'


export default function FeaturedProducts() {

    const [items, setItems] = useState([])

    useEffect(async () => {
        const q = await getDocs(collection(db, 'shirts'))
        const newItems = q.docs.map(doc => {
            return {
                ...doc.data()
            }
        })
        if (newItems) return setItems(newItems)
    }, [])

    return (
        <div className="py-4 px-16 min-h-screen bg-gray-200">
            <h2 className="text-center text-3xl">Featured products</h2>
            <div className="flex gap-4 justify-evenly items-center flex-wrap mt-8">
                {items.length > 0 && (
                    items.map(item => (
                        <ProductPreview key={item.code} {...item}/>
                    ))
                )}
            </div>
        </div>
    )
}

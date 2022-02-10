import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProductPreview from './ProductPreview'
import { fetchProducts } from '../../redux/actions'

const SPECIFIC_TAGS = ['inNewArrival', 'inNewCollection', 'onSale']
const TITLE_MAP = {
    inNewArrival: 'New Arrival',
    inNewCollection: 'New Collection',
    onSale: 'Price Drop'
}

export default function ProductsShowroom() {
    const [productsToShow, setProductsToShow] = useState([])
    const { tag } = useParams()
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
        if (!SPECIFIC_TAGS.includes(tag)) return getAllProducts()
        getSpecificProducts(tag)
    }, [tag, products])


    function getAllProducts() {
        setProductsToShow(products)
    }

    function getSpecificProducts(tag) {
        const correspondingProducts = products.filter(product => product[tag] === true)
        setProductsToShow(correspondingProducts)
    }

    return (
        <div className="showroom">
            <h2 className="text-2xl font-normal text-left">{SPECIFIC_TAGS.includes(tag) ? TITLE_MAP[tag] : 'All items'}</h2>
            <div className="product-grid">
                {productsToShow?.map((product, index) => (
                    <ProductPreview key={`specific_item_${index}`} {...product} />
                ))} 
            </div>
        </div>
    ) 
}

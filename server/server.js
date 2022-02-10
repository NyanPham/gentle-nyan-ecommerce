require('dotenv').config()
const items = require('./items')

const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))


function getItemsTotalAmount(items) {
    const total = items.reduce((total, item) => {
        return total + item.price * item.amount
    }, 0)
    return total
}

console.log(items)

app.post('/make-payment-intent', async(req, res) => {
    const items = req.body.checkoutItems
    const total = getItemsTotalAmount(items)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'vnd'
        })
    
        res.send({clientSecret: paymentIntent.client_secret}) 
    } catch (e) {
        console.error(e.error)
    }
})

app.get('/get-items', (req, res) => {
    res.send({items})
})

app.post('/retrieve-item', (req, res) => {
    const itemCode = req.body.productId
    const item = items.find(item => item.code === itemCode)
    res.send(item)
})

app.listen(4242, () => { console.log('Server has started on port http://localhost:4242')})
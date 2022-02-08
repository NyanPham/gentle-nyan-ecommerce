require('dotenv').config()

const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const app = express()

app.use(express.json())
app.use(cors({ origin: true}))

const calculateOrderAmount = items => {
    const total = items.reduce((total, item) => {
        return total + item.price * item.amount
    }, 0)

    return parseInt(total)
}


app.post('/create-payment-intent', async (req, res) => {
    const items = req.body.items
    const total = calculateOrderAmount(items)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'vnd',
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

app.listen(4242)
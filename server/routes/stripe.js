import express from 'express'
const router = express.Router()
import stripe from 'stripe'
// stripe = stripe(process.env.STRIPE_KEY)

router.post('/', async (req, res) => {
  stripe.ChargesResource.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr)
      } else {
        res.status(200).json(stripeRes)
      }
    }
  )
})

export default router

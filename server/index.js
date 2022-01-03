import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import stripe from './routes/stripe.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log(err)
  })

//testing api
app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('./api/checkout', stripe)
//port
const PORT = process.env.PORT || 5000

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

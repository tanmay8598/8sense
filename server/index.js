import express from 'express'
import sequelize from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

//test db
sequelize
  .authenticate()
  .then(() => console.log('Database connection successful!'))
  .catch((err) => console.log('Error: ' + err))

//testing api
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)

//port
const PORT = process.env.PORT || 5000

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

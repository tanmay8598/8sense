import { Sequelize } from 'sequelize'
import sequelize from '../config/database.js'

const Order = sequelize.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  productId: {
    type: Sequelize.STRING,
  },

  quantity: {
    type: Sequelize.INTEGER,
  },

  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    default: 'pending',
    // allowNull: false,
  },
})

sequelize
  .sync({ alter: true })
  .then(() => console.log('db has been synced'))
  .catch((err) => console.log(err))

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
export default Order

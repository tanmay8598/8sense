import { Sequelize } from 'sequelize'
import sequelize from '../config/database.js'
import Order from './order.js'
import Product from './product.js'

//define method takes 2 arguments
//1st-name of the table
//2nd-columns inside the table
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resetPassword: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  // Timestamps: {
  //   createdAt: Sequelize.DATE,
  //   updatedAt: Sequelize.DATE,
  // },
})

// User.hasMany(Order)
// User.hasMany(Product)
sequelize
  .sync({ alter: true })
  .then(() => console.log('db has been synced'))
  .catch((err) => console.log(err))

export default User

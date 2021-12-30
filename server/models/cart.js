import { Sequelize } from 'sequelize'
import sequelize from '../config/database.js'

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  // products: [
  //   {
  //     productId: {
  //       type: Sequelize.INTEGER,
  //       allowNull: false,
  //     },
  //     quantity: {
  //       type: Sequelize.INTEGER,
  //       default: 1,
  //     },
  //   },
  // ],
})

sequelize
  .sync({ alter: true })
  .then(() => console.log('db has been synced'))
  .catch((err) => console.log(err))

export default Cart

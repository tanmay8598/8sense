import { Sequelize } from 'sequelize'
import sequelize from '../config/database.js'

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'title',
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
    // unique: true
  },
  img: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  inStock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})

sequelize
  .sync({ alter: true })
  .then(() => console.log('db has been synced'))
  .catch((err) => console.log(err))

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
export default Product

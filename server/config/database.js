//include sequelize module
import { Sequelize } from 'sequelize'

//creating a new object of sequelize
const sequelize = new Sequelize('8sensedb', 'tanmay', '1234', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
  // port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

// Exporting the sequelize object.
// We can use it in another file
// for creating models
export default sequelize

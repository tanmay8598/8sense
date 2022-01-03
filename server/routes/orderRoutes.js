import express from 'express'
const router = express.Router()
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  orderStats,
} from '../controller/orderController.js'

router.route('/income').get(orderStats)
router.route('/').post(createOrder).get(getAllOrders)
router.route('/:id').post(updateOrder).delete(deleteOrder)
router.route('/find/:id').get(getOrder)

export default router

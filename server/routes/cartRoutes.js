import express from 'express'
const router = express.Router()
import {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} from '../controller/cartController.js'

router.route('/').post(createCart)
router
  .route('/:id')
  .post(updateCart)
  .delete(deleteCart)
  .get(getCart)
  .get(getAllCarts)
export default router

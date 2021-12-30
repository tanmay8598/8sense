import express from 'express'
const router = express.Router()
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} from '../controller/productController.js'

router.route('/').post(createProduct).get(getAllProducts)
router.route('/:id').post(updateProduct).delete(deleteProduct).get(getProduct)

export default router

import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'

//create
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//update product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productToEdit = await Product.findByPk(req.params.id)
    const changedProduct = await productToEdit.update(req.body)

    res.json(changedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productToRemove = await Product.findByPk(req.params.id)
    await productToRemove.destroy()

    res.send(req.params.id)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get product by id
const getProduct = asyncHandler(async (req, res) => {
  try {
    const selectedProduct = await Product.findByPk(req.params.id)

    res.json(selectedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['title', 'ASC']] })
    res.json(products)
  } catch (error) {
    res.status(500).json(error)
  }
})

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
}

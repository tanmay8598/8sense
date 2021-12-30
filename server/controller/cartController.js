import asyncHandler from 'express-async-handler'
import Cart from '../models/cart.js'

//create
const createCart = asyncHandler(async (req, res) => {
  const newCart = new Cart(req.body)
  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//update
const updateCart = asyncHandler(async (req, res) => {
  try {
    const cartToEdit = await Cart.findByPk(req.params.id)
    const changedCart = await cartToEdit.update(req.body)

    res.json(changedCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete cart
const deleteCart = asyncHandler(async (req, res) => {
  try {
    const CartToRemove = await Cart.findByPk(req.params.id)
    await CartToRemove.destroy()

    res.send(req.params.id)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get user cart by user id
const getCart = asyncHandler(async (req, res) => {
  try {
    const selectedCart = await Cart.findByPk(req.params.id)

    res.json(selectedCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all

const getAllCarts = asyncHandler(async (req, res) => {
  try {
    const carts = await Cart.findAll()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
})

export { createCart, updateCart, deleteCart, getCart, getAllCarts }

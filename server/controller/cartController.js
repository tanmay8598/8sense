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
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedCart)
  } catch (err) {
    res.status(500).json(err)
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
    const cart = await Cart.findOne({ userId: req.params.userId })
    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get all

const getAllCarts = asyncHandler(async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (err) {
    res.status(500).json(err)
  }
})

export { createCart, updateCart, deleteCart, getCart, getAllCarts }

import asyncHandler from 'express-async-handler'
import Order from '../models/order.js'

//create
const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body)
  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

// //update
const updateOrder = asyncHandler(async (req, res) => {
  try {
    const orderToEdit = await Order.findByPk(req.params.id)
    const changedOrder = await orderToEdit.update(req.body)

    res.json(changedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

// //delete cart
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const OrderToRemove = await Order.findByPk(req.params.id)
    await OrderToRemove.destroy()

    res.send(req.params.id)
  } catch (error) {
    res.status(500).json(error)
  }
})

// //get user Order by user id
const getOrder = asyncHandler(async (req, res) => {
  try {
    const selectedOrder = await Order.findByPk(req.params.id)

    res.json(selectedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

// //get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.findAll()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get monthly income
const orderStats = asyncHandler(async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },

        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ])
    console.log(income)
    res.status(200).json(income)
    // console.log(income)
  } catch (error) {
    res.status(500).json(error)
  }
})

export {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  orderStats,
}

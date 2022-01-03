import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import CryptoJS from 'crypto-js'

//Delete User
const deleteUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted...')
  } catch (err) {
    res.status(500).json(err)
  }
})

// User Login
const userLogin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.user_name,
    })

    !user && res.status(401).json('Wrong User Name')

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    )

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    const inputPassword = req.body.password

    originalPassword != inputPassword && res.status(401).json('Wrong Password')

    const accessToken = generateToken(user._id)

    const { password, ...others } = user._doc
    res.status(200).json({ ...others, accessToken })
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get all users
const getUsers = asyncHandler(async (req, res) => {
  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Register user
const registerUser = asyncHandler(async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString()
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get user stats
const getUserStats = asyncHandler(async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

export {
  getUsers,
  registerUser,
  userLogin,
  getUserById,
  updateUserProfile,
  deleteUser,
  getUserStats,
}

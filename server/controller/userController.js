import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import CryptoJS from 'crypto-js'

//delete
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const removedUser = await User.findByPk(req.params.id, {
      attributes: ['id'],
    })
    await removedUser.destroy()
    res.status(204).json('Deleted User')
  } catch (error) {
    res.status(500).json(error)
  }
})

//@desc User Login
//@route Post /api/users/login
//@access Public
const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body
    // console.log(email)
    const user = await User.findOne({ where: { email } })
    // console.log(user)
    !user && res.status(401).json('Wrong credentials!')

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    )
    const stringPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    // console.log(stringPassword)

    stringPassword !== password && res.status(401).json('Wrong Cred!')
    // console.log(user.name)

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

//@desc Get all users
//@route Get /api/users
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

//@desc Register user
//@route Post /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ where: { email } })

  if (userExists) {
    res.status(404)
    throw new Error('User Already exists')
  }

  const newUser = await User.create({
    name,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      // password: CryptoJS.AES.encrypt(newUser.password, process.env.PASS_SEC),
      token: generateToken(newUser.id),
    })
  } else {
    res.status(404)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @description  Update user profile
// @route        PUT /api/users/profile
// @access       Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//get user stats
const getUserStats = asyncHandler(async (req, res) => {
  const date = new Date()

  const lastYear = new Date(date.setFullYear(date.setFullYear() - 1))

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
          id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
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

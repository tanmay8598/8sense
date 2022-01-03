import express from 'express'
const router = express.Router()
import {
  getUsers,
  registerUser,
  userLogin,
  getUserById,
  updateUserProfile,
  deleteUser,
  getUserStats,
} from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(getUsers)

router.route('/login').post(userLogin)

router
  .route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)

router.route('/profile').put(protect, updateUserProfile)
router.route('/stats').get(protect, admin, getUserStats)
export default router

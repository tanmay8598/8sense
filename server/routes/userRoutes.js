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
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(getUsers)

router.route('/login').post(userLogin)

router.route('/:id').get(getUserById).delete(deleteUser)

router.route('/profile').put(updateUserProfile)
router.route('/stats').get(getUserStats)
export default router

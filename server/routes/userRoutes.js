import { Router } from 'express'
import { updateProfile, changePassword } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.put('/me', protect, updateProfile)
router.put('/me/password', protect, changePassword)

export default router

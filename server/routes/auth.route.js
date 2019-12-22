import express from 'express'
import {
  login,
  register,
  sendLoginLink,
  loginWithGoogle,
  logout
} from '../controllers/auth.controller'
import { validateToken } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', loginWithGoogle)
router.post('/logout', validateToken, logout)
router.post('/send-login-link', sendLoginLink)

export default router
import express from 'express';
const router = express.Router()
import * as dotenv from 'dotenv'
import { AuthController } from '../controllers/AuthController.js';
dotenv.config()

router.get('/login', AuthController.login)
router.post('/register', AuthController.register)
router.get('/forgot-password', AuthController.forgotPassword)

export { router as authRoutes }


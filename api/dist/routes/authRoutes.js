import express from 'express';
import * as dotenv from 'dotenv';
import { AuthController } from '../controllers/AuthController.js';
const router = express.Router();
dotenv.config();
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/forgot-password', AuthController.forgotPassword);
export { router as authRoutes };
//# sourceMappingURL=authRoutes.js.map
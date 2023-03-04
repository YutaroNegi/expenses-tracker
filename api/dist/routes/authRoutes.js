import express from 'express';
import * as dotenv from 'dotenv';
import { AuthController } from '../controllers/AuthController.js';
import rateLimit from 'express-rate-limit';
const router = express.Router();
dotenv.config();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many accounts created from this IP, please try again after an hour"
});
router.post('/login', limiter, AuthController.login);
router.post('/register', AuthController.register);
router.post('/forgot-password', AuthController.forgotPassword);
export { router as authRoutes };
//# sourceMappingURL=authRoutes.js.map
import express from 'express';
import * as dotenv from 'dotenv';
import { AuthController } from '../controllers/AuthController.js';
import rateLimit from 'express-rate-limit';
const router = express.Router();
dotenv.config();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Muitas tentativas de login. Tente novamente mais tarde."
});
router.post('/login', limiter, AuthController.login);
router.post('/register', AuthController.register);
router.post('/forgot-password', AuthController.forgotPassword);
export { router as authRoutes };
//# sourceMappingURL=authRoutes.js.map
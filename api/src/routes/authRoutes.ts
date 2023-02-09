import express from 'express';
const router = express.Router()
import * as dotenv from 'dotenv'
dotenv.config()

router.get('/login', (req, res) => {res.send("Login page")})
router.get('/register', (req, res) => {res.send("Login page")})
router.get('/forgot-password', (req, res) => {res.send("Login page")})

export {router as authRoutes}


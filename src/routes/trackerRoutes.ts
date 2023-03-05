import express from 'express';
import * as dotenv from 'dotenv'
import { TrackerController } from '../controllers/TrackerController.js';

const router = express.Router()
dotenv.config()

router.get('/categories', TrackerController.verifyToken, TrackerController.listCategories)
router.get('/expenses/:userId', TrackerController.verifyToken, TrackerController.verifyToken, TrackerController.listExpenses)

router.post('/expense', TrackerController.verifyToken, TrackerController.createExpense)
router.put('/expense', TrackerController.verifyToken, TrackerController.updateExpense)
router.delete('/expense/:expenseId', TrackerController.verifyToken, TrackerController.deleteExpense)

export { router as trackerRoutes }


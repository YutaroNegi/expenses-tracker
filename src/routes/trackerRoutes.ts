import express from 'express';
import * as dotenv from 'dotenv'
import { TrackerController } from '../controllers/TrackerController.js';

const router = express.Router()
dotenv.config()

router.get('/categories', TrackerController.listCategories)
router.get('/expenses/:userId', TrackerController.listExpenses)

router.post('/expense', TrackerController.createExpense)
router.put('/expense', TrackerController.updateExpense)
router.delete('/expense/:expenseId', TrackerController.deleteExpense)

export { router as trackerRoutes }


import express from 'express';
const router = express.Router();
import * as dotenv from 'dotenv';
import { TrackerController } from '../controllers/TrackerController.js';
dotenv.config();
router.get('/categories', TrackerController.listCategories);
router.get('/expenses/:userId', TrackerController.listExpenses);
router.post('/expense', TrackerController.createExpense);
router.put('/expense', TrackerController.updateExpense);
router.delete('/expense', TrackerController.deleteExpense);
export { router as trackerRoutes };
//# sourceMappingURL=trackerRoutes.js.map
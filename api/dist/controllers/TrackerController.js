import { Category } from "../models/CategoryModel.js";
import { Expense } from "../models/ExpenseModel.js";
export class TrackerController {
    static async listCategories(req, res) {
        try {
            const categories = await Category.findAll();
            return res.status(200).json({ categories });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error listing categories', error });
        }
    }
    static async listExpenses(req, res) {
        try {
            const fkUserId = req.params.userId;
            if (!fkUserId) {
                return res.status(400).json({ message: 'Missing information' });
            }
            const expenses = await Expense.findAll({
                where: {
                    fkUserId: fkUserId
                },
                include: [{
                        model: Category,
                        attributes: ['categoryName']
                    }]
            });
            const expenseList = expenses.map((expense) => {
                return {
                    expenseId: expense.expenseId,
                    fkUserId: expense.fkUserId,
                    fkCategoryId: expense.fkCategoryId,
                    categoryName: expense.Category.categoryName,
                    expenseName: expense.expenseName,
                    amount: expense.amount,
                    // convert to yyyy-mm-dd format
                    expenseDate: expense.expenseDate.toISOString().slice(0, 10)
                };
            });
            return res.status(200).json({ expenseList });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error listing expenses', error });
        }
    }
    static async createExpense(req, res) {
        const { fkUserId, fkCategoryId, amount, expenseDate, expenseName } = req.body;
        const missingInfo = !fkUserId || !fkCategoryId || !amount || !expenseDate || !expenseName;
        const invalidInfo = () => res.status(400).json({ message: 'Invalid information' });
        if (missingInfo) {
            return invalidInfo();
        }
        try {
            const expense = await Expense.create({ fkUserId, fkCategoryId, amount, expenseDate, expenseName });
            return res.status(201).json({ expense });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error creating expense', error });
        }
    }
    static async updateExpense(req, res) {
        const { expenseId, fkCategoryId, amount, expenseDate, expenseName } = req.body;
        const missingInfo = !expenseId || !fkCategoryId || !amount || !expenseDate || !expenseName;
        const invalidInfo = () => res.status(400).json({ message: 'Invalid information' });
        if (missingInfo) {
            return invalidInfo();
        }
        try {
            const expense = await Expense.update({ fkCategoryId, amount, expenseDate, expenseName }, { where: { expenseId } });
            return res.status(200).json({ expense });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error updating expense', error });
        }
    }
    static async deleteExpense(req, res) {
        const { expenseId } = req.body;
        const missingInfo = !expenseId;
        const invalidInfo = () => res.status(400).json({ message: 'Invalid information' });
        if (missingInfo) {
            return invalidInfo();
        }
        try {
            const expense = await Expense.destroy({ where: { expenseId } });
            return res.status(200).json({ expense });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error deleting expense', error });
        }
    }
}
//# sourceMappingURL=TrackerController.js.map
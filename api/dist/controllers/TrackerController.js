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
            if (!expenses) {
                const expenseList = [];
                return res.status(200).json({ expenseList });
            }
            const expenseList = expenses.map((expense) => {
                return {
                    expenseId: expense.expenseId,
                    fkUserId: expense.fkUserId,
                    fkCategoryId: expense.fkCategoryId,
                    categoryName: expense.Category.categoryName,
                    expenseName: expense.expenseName,
                    amount: parseFloat(expense.amount),
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
        const { fkUserId, fkCategoryId, amount, expenseDate, expenseName, installments } = req.body;
        const missingInfo = !fkUserId || !fkCategoryId || !amount || !expenseDate || !expenseName || !installments;
        const invalidInfo = () => res.status(400).json({ message: 'Invalid information' });
        if (missingInfo) {
            return invalidInfo();
        }
        try {
            if (installments === 1) {
                await Expense.create({ fkUserId, fkCategoryId, amount, expenseDate, expenseName });
                return res.status(201).json({ message: 'Expense created' });
            }
            else {
                for (let i = 0; i < Number(installments); i++) {
                    // setting the month of the expenseDate to the current month + i
                    const expenseDateObj = new Date(expenseDate);
                    expenseDateObj.setMonth(expenseDateObj.getMonth() + i);
                    const installmentDate = expenseDateObj.toISOString().slice(0, 10);
                    // setting expense name to the current expense name + i
                    const installmentName = expenseName + ' | ' + (i + 1);
                    // setting expense value to the current expense value / installments
                    const installmentAmount = (amount / installments).toFixed(2);
                    await Expense.create({ fkUserId, fkCategoryId, amount: installmentAmount, expenseDate: installmentDate, expenseName: installmentName });
                }
                return res.status(201).json({ message: 'Expenses created' });
            }
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
        const expenseId = req.params.expenseId;
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
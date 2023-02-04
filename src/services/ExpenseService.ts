import { Expense, ExpenseForm } from '../types';
import { categories, expenses } from '../mock/expensesMock'

export class ExpenseService {
    async registerExpense(expenseForm: ExpenseForm) {
        try {
            let response: Expense = {
                expenseId: Math.floor(Math.random() * 1000),
                ...expenseForm
            }
            return response
        } catch (error) {
            throw error;
        }
    }

    async getExpenses() {
        try {
            return expenses
        } catch (error) {
            throw error;
        }
    }

    async getCategories() {
        try {
            return categories
        } catch (error) {
            throw error;
        }
    }

    async deleteExpense(expenseId: number) {
        try {
            return expenseId
        } catch (error) {
            throw error;
        }
    }
}
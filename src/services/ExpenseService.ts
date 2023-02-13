import axios from 'axios';
import { Expense, ExpenseForm } from '../types';

const baseUrl = 'http://localhost:5050/api/tracker';

export class ExpenseService {
    async registerExpense(expenseForm: ExpenseForm) {
        try {
            const response = await axios.post(baseUrl + '/expense', {
                ...expenseForm
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getExpenses(userId: number) {
        try {
            const response = await axios.get(baseUrl + '/expenses/' + userId);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCategories() {
        try {
            const response = await axios.get(baseUrl + '/categories');
            return response.data.categories;
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
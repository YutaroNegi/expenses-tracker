import axios from 'axios';
import { RegisterExpenseForm } from '../types';

const baseUrl = 'http://localhost:5050/api/tracker';

export class ExpenseService {
    async registerExpense(expenseForm: RegisterExpenseForm) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        try {
            const response = await axios.post(baseUrl + '/expense', {
                ...expenseForm,
                fkUserId: user.userId
            });

            console.log(response.data);
            
            return {
                expenseId: response.data.expense.expenseId,
                expenseDate: response.data.expense.expenseDate.substring(0, response.data.expenseDate.lastIndexOf("T")),
                amount: response.data.expense.amount,
                categoryName: response.data.expense.categoryName,
                fkUserId: response.data.expense.fkUserId,
                expenseName: response.data.expense.expenseName
            }
        } catch (error) {
            throw error;
        }
    }

    async getExpenses(userId: number) {
        try {
            const response = await axios.get(baseUrl + '/expenses/' + userId);

            return response.data.expenseList;
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
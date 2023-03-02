import axios from 'axios';
import { RegisterExpenseForm } from '../types';

const baseUrl = process.env.API_URL || 'http://localhost:3000';

export class ExpenseService {
    async registerExpense(expenseForm: RegisterExpenseForm) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const response = await axios.post(baseUrl + '/expense', {
            ...expenseForm,
            fkUserId: user.userId
        });            
        
        return {
            expenseId: response.data.expense.expenseId,
            expenseDate: response.data.expense.expenseDate,
            amount: response.data.expense.amount,
            categoryName: response.data.expense.categoryName,
            fkUserId: response.data.expense.fkUserId,
            expenseName: response.data.expense.expenseName
        }
    }

    async getExpenses(userId: number) {
        const response = await axios.get(baseUrl + '/expenses/' + userId);
            
        return response.data.expenseList;
    }

    async getCategories() {
        const response = await axios.get(baseUrl + '/categories');
        return response.data.categories;
    }

    async deleteExpense(expenseId: number) {
        const response = await axios.delete(baseUrl + '/expense/' + expenseId);
        return response.data;
    }
}
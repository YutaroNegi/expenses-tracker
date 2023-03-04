import axios from 'axios';
import { RegisterExpenseForm } from '../types';

const baseUrl = process.env.REACT_APP_API_URL + '/tracker' || 'http://localhost:3000/tracker';

export class ExpenseService {
    async registerExpense(expenseForm: RegisterExpenseForm) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        await axios.post(baseUrl + '/expense', {
            ...expenseForm,
            fkUserId: user.userId
        });   
        
        return;
    }

    async getExpenses(userId: number) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;
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
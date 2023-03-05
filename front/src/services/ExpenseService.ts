import axios from 'axios';
import { RegisterExpenseForm } from '../types';

const BASE_URL = process.env.REACT_APP_API_URL + '/tracker';
const TOKEN_KEY = 'token';
const USER_KEY = 'user';


export class ExpenseService {
    private token: string | null = null;

    constructor() {
        this.token = localStorage.getItem(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = this.token;
    }

    async registerExpense(expenseForm: RegisterExpenseForm) {
        const user = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        await axios.post(BASE_URL + '/expense', {
            ...expenseForm,
            fkUserId: user.userId
        });
        return;
    }

    async getExpenses(userId: number) {
        const response = await axios.get(BASE_URL + '/expenses/' + userId);
        return response.data.expenseList;
    }

    async getCategories() {
        const response = await axios.get(BASE_URL + '/categories');
        return response.data.categories;
    }

    async deleteExpense(expenseId: number) {
        const response = await axios.delete(BASE_URL + '/expense/' + expenseId);
        return response.data;
    }
}
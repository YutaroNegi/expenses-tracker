import axios from 'axios';
import { RegisterExpenseForm } from '../types';

const baseUrl = process.env.REACT_APP_API_URL + '/tracker' || 'http://localhost:3000/tracker';

export class ExpenseService {
    async registerExpense(expenseForm: RegisterExpenseForm) {
        // const expenseDateObj = new Date(expenseForm.expenseDate);
        // expenseDateObj.setMonth(expenseDateObj.getMonth() + 1);
        // const installmentDate = expenseDateObj.toISOString().slice(0, 10);

        // console.log(installmentDate);
        // return

        const user = JSON.parse(localStorage.getItem('user') || '{}');
        await axios.post(baseUrl + '/expense', {
            ...expenseForm,
            fkUserId: user.userId
        });   
        
        return;
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
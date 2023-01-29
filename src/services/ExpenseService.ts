import { Expense, ExpenseForm } from '../types';

export class ExpenseService {
    async registerExpense(expenseForm: ExpenseForm) {
        try {           
            let response : Expense = {
                expenseId: 1,
                ...expenseForm
            }
            return response
        } catch (error) {
            throw error;
        }
    }
}
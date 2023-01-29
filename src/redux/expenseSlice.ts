import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { Expense, CategoryTotal, ExpenseState, categories } from '../types/Expense'


const initialState: ExpenseState = {
    currentDate: new Date().toISOString().slice(0, 10),
    expenses: [],
    total: 0,
    categoryTotal: [],
    categories: [
        { value: "Grocery", label: "Grocery" },
        { value: "Pharmacy", label: "Pharmacy" },
        { value: "Restaurant", label: "Restaurant" },
        { value: "Transportation", label: "Transportation" },
        { value: "Other", label: "Other" },
      ]
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload)

            let total = 0;
            let categoryTotal: CategoryTotal[] = [];
            state.expenses.forEach((expense: Expense) => {
                total += expense.amount;
                let category = categoryTotal.find((categoryTotal: CategoryTotal) => categoryTotal.category === expense.category);
                if (category) {
                    category.total += expense.amount;
                } else {
                    categoryTotal.push({ category: expense.category, total: expense.amount });
                }
            });
            
            state.total = total;
            state.categoryTotal = categoryTotal;
        },
        loadExpenses: (state, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload
        },
        updateDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload
        }
    }
})

export const { addExpense } = expenseSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default expenseSlice.reducer
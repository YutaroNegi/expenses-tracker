import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { Expense, CategoryTotal, ExpenseState, Category, ExpenseRow, ExpenseDate } from '../types/Expense'


const initialState: ExpenseState = {
    month: 1,
    year: 2021,
    expenses: [],
    expenseRows: [],
    categoryTotal: [],
    categories: [],
    monthExpenseTotal: 0,
    monthIncomeTotal: 0,
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload)

            let categoryTotal: CategoryTotal[] = [];
            state.expenses.forEach((expense: Expense) => {
                if (expense.categoryName === "Income"){
                    state.monthIncomeTotal += expense.amount;
                    return;
                }

                state.monthExpenseTotal += expense.amount;
                let category = categoryTotal.find((categoryTotal: CategoryTotal) => categoryTotal.category === expense.categoryName);
                if (category) {
                    category.total += expense.amount;
                } else {
                    categoryTotal.push({ category: expense.categoryName, total: expense.amount });
                }
            });
            state.categoryTotal = categoryTotal;
        },
        loadExpenses: (state, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload
        },
        updateDate: (state, action: PayloadAction<ExpenseDate>) => {
            state.month = action.payload.month;
            state.year = action.payload.year;
        },
        loadCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        },
        convertExpensesToRows: (state) => {
            let filteredExpenses = state.expenses.filter((expense: Expense) => {
                let expenseDate = expense.expenseDate.substring(0, expense.expenseDate.lastIndexOf("-"))
                let expenseMonth = parseInt(expenseDate.substring(expenseDate.lastIndexOf("-") + 1));
                let expenseYear = parseInt(expenseDate.substring(0, expenseDate.lastIndexOf("-")));                
                if (expenseMonth === state.month && expenseYear === state.year) return true;
            });
        
            let expenseRows: ExpenseRow[] = [];
            filteredExpenses.forEach((expense: Expense) => {
                let expenseRow = expenseRows.find((expenseRow: ExpenseRow) => expenseRow.category === expense.categoryName);
                if (expenseRow) {
                    expenseRow.expenses.push(expense);
                } else {
                    expenseRows.push({ category: expense.categoryName, expenses: [expense] });
                }
            });

            state.expenseRows = expenseRows
        },
        deleteExpense: (state, action: PayloadAction<Number>) => {
            state.expenses = state.expenses.filter((expense: Expense) => expense.expenseId !== action.payload);
        }
    }
})

export const { addExpense, loadCategories, loadExpenses, updateDate, convertExpensesToRows, deleteExpense } = expenseSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default expenseSlice.reducer
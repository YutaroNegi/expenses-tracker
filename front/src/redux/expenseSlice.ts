import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { Expense, CategoryTotal, ExpenseState, Category, ExpenseRow, ExpenseDate, PieChart } from '../types/Expense'


const initialState: ExpenseState = {
    month: 1,
    year: 2021,
    expenses: [],
    expenseRows: [],
    categoryTotal: [],
    categories: [],
    monthExpenseTotal: 0,
    monthIncomeTotal: 0,
    pieChart: {
        labels: [],
        dataSets: {
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }
    }
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload)

            const categoryTotal: CategoryTotal[] = [];
            state.expenses.forEach((expense: Expense) => {
                if (expense.categoryName === "Income") {
                    state.monthIncomeTotal += expense.amount;
                    return;
                }

                state.monthExpenseTotal += expense.amount;
                const category = categoryTotal.find((categoryTotal: CategoryTotal) => categoryTotal.category === expense.categoryName);
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
            const filteredExpenses = state.expenses.filter((expense: Expense) => {
                const expenseDate = expense.expenseDate.substring(0, expense.expenseDate.lastIndexOf("-"))
                const expenseMonth = parseInt(expenseDate.substring(expenseDate.lastIndexOf("-") + 1));
                const expenseYear = parseInt(expenseDate.substring(0, expenseDate.lastIndexOf("-")));
                if (expenseMonth === state.month && expenseYear === state.year) return true;
            });

            const expenseRows: ExpenseRow[] = [];
            filteredExpenses.forEach((expense: Expense) => {
                const expenseRow = expenseRows.find((expenseRow: ExpenseRow) => expenseRow.category === expense.categoryName);
                if (expenseRow) {
                    expenseRow.expenses.push(expense);
                } else {
                    expenseRows.push({ category: expense.categoryName, expenses: [expense] });
                }
            });

            state.expenseRows = expenseRows
        },
        convertExpensesToPieChart: (state) => {
            const getRandomColor = () => {
                const letters = '0123456789ABCDEF';
                let color = '#';

                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }

                return color;
            }

            const dataToTransform = state.expenseRows.map((expenseRow: ExpenseRow) => {
                console.log(expenseRow);
                
                return { category: expenseRow.category, total: expenseRow.expenses.reduce((total: number, expense: Expense) => total + expense.amount, 0) }
            });

            const backgroundColor: string[] = [];
            const borderColor: string[] = [];
            const labels: string[] = [];
            const data: number[] = [];

            dataToTransform.forEach((categoryTotal: CategoryTotal) => {
                backgroundColor.push(getRandomColor());
                borderColor.push(getRandomColor());
                labels.push(categoryTotal.category);
                data.push(categoryTotal.total);
            }
            );

            state.pieChart = {
                labels: labels,
                dataSets: {
                    label: 'Expense',
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }

            }
        },
        deleteExpense: (state, action: PayloadAction<number>) => {
            state.expenses = state.expenses.filter((expense: Expense) => expense.expenseId !== action.payload);
        }
    }
})

export const { addExpense, loadCategories, loadExpenses, updateDate, convertExpensesToRows, deleteExpense, convertExpensesToPieChart } = expenseSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default expenseSlice.reducer
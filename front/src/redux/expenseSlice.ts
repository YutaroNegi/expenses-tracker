import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { Expense, CategoryTotal, ExpenseState, Category, ExpenseRow, ExpenseDate, Datasets } from '../types/Expense'


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
        datasets: []
    }
}

const defaultColors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#3f51b5",
    "#2196f3",
    "#4caf50",
    "#ffeb3b",
    "#ff5722",
]

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
                const randomIndex = Math.floor(Math.random() * defaultColors.length);
                return defaultColors[randomIndex];
            }

            const getColorByIndex = (index: number) => {
                if (index < defaultColors.length) return defaultColors[index];

                return getRandomColor();
            }

            const dataToTransform = state.expenseRows.map((expenseRow: ExpenseRow) => {
                const total = expenseRow.expenses.reduce((total: number, expense: Expense) => total + expense.amount, 0);
                return { category: expenseRow.category, total: total }
            });

            const labels = dataToTransform.map((data: CategoryTotal) => data.category);
            const data = dataToTransform.map((data: CategoryTotal) => data.total);
            const backgroundColor = dataToTransform.map((data: CategoryTotal, index: number) => getColorByIndex(index));
            const borderColor = dataToTransform.map((data: CategoryTotal, index: number) => getColorByIndex(index));

            const dataSets: Datasets[] = [{
                label: "Expense",
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }];

            state.pieChart.labels = labels;
            state.pieChart.datasets = dataSets;
        },
        deleteExpense: (state, action: PayloadAction<number>) => {
            state.expenses = state.expenses.filter((expense: Expense) => expense.expenseId !== action.payload);
        }
    }
})

export const { addExpense, loadCategories, loadExpenses, updateDate, convertExpensesToRows, deleteExpense, convertExpensesToPieChart } = expenseSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default expenseSlice.reducer
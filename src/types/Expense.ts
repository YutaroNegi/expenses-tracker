export type ExpenseForm = {
    amount: number;
    expense: string;
    date: string;
    category: string;
};

export type Expense = {
    expenseId: number;
} & ExpenseForm;

export type CategoryTotal = {
    category: string;
    total: number;
}

export type Category = {
    value: string;
    label: string;
}


export type categories = {
    categories: Category[];
}

export type ExpenseState = {
    month: number;
    year: number;
    expenses: Expense[];
    expenseRows: ExpenseRow[];
    total: number;
    categoryTotal: CategoryTotal[];
    categories: Category[];
}

export type ExpenseRow = {
    category: string;
    expenses: Expense[];
}

export type ExpenseDate = { 
    month: number;
    year: number;
}
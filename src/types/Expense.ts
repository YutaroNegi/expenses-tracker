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
    currentDate: string;
    expenses: Expense[];
    total: number;
    categoryTotal: CategoryTotal[];
    categories: Category[];
}
export type ExpenseForm = {
    amount: number;
    expenseName: string;
    expenseDate: string;
    categoryName: string;
};

export type RegisterExpenseForm = {
    amount: number;
    expenseName: string;
    expenseDate: string;
    fkCategoryId: number;
    installments: number;
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

export type Datasets = {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
}

export type PieChart = {
    labels: string[];
    dataSets: Datasets;
}


export type ExpenseState = {
    month: number;
    year: number;
    expenses: Expense[];
    expenseRows: ExpenseRow[];
    categoryTotal: CategoryTotal[];
    categories: Category[];
    monthExpenseTotal: number;
    monthIncomeTotal: number;
    pieChart: PieChart;

}

export type ExpenseRow = {
    category: string;
    expenses: Expense[];
}

export type ExpenseDate = {
    month: number;
    year: number;
}
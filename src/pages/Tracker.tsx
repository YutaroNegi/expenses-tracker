import Box from "@mui/material/Box";
import { SelectChangeEvent } from '@mui/material/Select';
import { Dropdown, Input, Button } from "../components/index";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addExpense } from '../redux/expenseSlice';
import { ExpenseService } from '../services/ExpenseService';
import { ExpenseForm } from '../types';
import { toast } from 'react-toastify';

export const Tracker = () => {
  const expenseService = new ExpenseService();
  const expensesState = useSelector((state: any) => state.expense);  
  const dispatch = useDispatch();
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [expenseForm, setExpenseForm] = useState<ExpenseForm>({ amount: 0, expense: '', date: new Date().toISOString().slice(0, 10), category: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExpenseForm({ ...expenseForm, [e.target.name]: e.target.name === 'amount' ? parseFloat(e.target.value) : e.target.value });    
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string);
    setExpenseForm({ ...expenseForm, category: event.target.value as string })
  };

  const handleAddExpense = async () => {
    if(!expenseForm.expense || !expenseForm.amount || !expenseForm.date || !expenseForm.category) {
      toast.error('Please fill all the fields');
      return;
    }

    setLoading(true);

    const expenseResponse = await expenseService.registerExpense(expenseForm);
    dispatch(addExpense(expenseResponse));

    toast.success('Expense registered successfully')
    setLoading(false);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Input
        onChange={handleInputChange}
        name="expense"
        label="Expense"
      />
      <Input
        onChange={handleInputChange}
        name="amount"
        type="number"
        label="Amount"
      />

      <Input
        onChange={handleInputChange}
        name="date"
        type="date"
        label=""
        value={new Date().toISOString().slice(0, 10)}
      />

      <Dropdown
        onSelectedChange={handleDropdownChange}
        options={expensesState.categories}
        value={tag}
        key="tag"
        label="Tag"
      />

      <Button
        onClick={() => handleAddExpense()}
        variant="contained"
        loading={loading}
        label="Register"
      />
    </Box>
  );
};

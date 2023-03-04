import React from 'react';
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Dropdown,
  Input,
  Button,
  ExpenseTable,
  DateSelector,
} from "../components/index";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCategories,
  loadExpenses,
  convertExpensesToRows,
  deleteExpense,
  updateDate
} from "../redux/expenseSlice";
import { ExpenseService } from "../services/ExpenseService";
import { RegisterExpenseForm } from "../types";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';

export const Tracker = () => {
  const navigate = useNavigate();
  const expenseService = new ExpenseService();
  const expensesState = useSelector((state: any) => state.expense);
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [expenseForm, setExpenseForm] = useState<RegisterExpenseForm>({
    amount: 0,
    expenseName: "",
    expenseDate: "",
    fkCategoryId: 0,
    installments: 0,
  });


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setScreenLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");    
    const token = localStorage.getItem("token");
    
    if (!token || !user) {
      setScreenLoading(false);
      navigate('/login');
      return;
    }
    
    try {
      const categories = await expenseService.getCategories();
      const expenses = await expenseService.getExpenses(user.userId);

      const currentDate = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      }
  
      dispatch(loadCategories(categories));
      dispatch(updateDate(currentDate));
      dispatch(loadExpenses(expenses));
      dispatch(convertExpensesToRows());
  
      setScreenLoading(false)
    } catch (error) {
      toast.warning("You must be logged in");
      setScreenLoading(false);
      navigate('/login');
      return;
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    expenseService.deleteExpense(id);
    await expenseService.deleteExpense(id);
    dispatch(deleteExpense(id));
    dispatch(convertExpensesToRows());
    setLoading(false);
    toast.success("Expense deleted successfully");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExpenseForm({
      ...expenseForm,
      [e.target.name]:
        e.target.name === "amount"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string);
    setExpenseForm({ ...expenseForm, fkCategoryId: parseInt(event.target.value)});
  };

  const verifyInstallments = (installments: number) => {
    if (installments < 1) {
      toast.error("Installments must be greater than 0");
      return false;
    }

    // check if installments is not decimal
    if (installments % 1 !== 0) {
      toast.error("Installments must be an integer");
      return false;
    }
  }

  const handleAddExpense = async () => {
    if (
      !expenseForm.expenseName ||
      !expenseForm.amount ||
      !expenseForm.expenseDate ||
      !expenseForm.fkCategoryId ||
      !expenseForm.installments
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (expenseForm.fkCategoryId === 11){
      expenseForm.amount = expenseForm.amount * -1;
    }

    if (verifyInstallments(expenseForm.installments) === false) {
      return;
    }
    
    setLoading(true);
    
    try {
      await expenseService.registerExpense(expenseForm);
      toast.success("Expense registered successfully");
    } catch (error) {
      toast.error("Error registering expense");
      setLoading(false);
      return;
    }

    try {
      await getData();
    } catch (error) {
      toast.error("Error loading expenses");
      setLoading(false);
      return;
    }


    setLoading(false);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <DateSelector/>
      <Input onChange={handleInputChange} name="expenseName" label="Name" />
      <Input
        onChange={handleInputChange}
        name="amount"
        type="number"
        label="Amount"
      />

      <Input
        onChange={handleInputChange}
        name="installments"
        type="number"
        label="Installments"
      />

      <Input onChange={handleInputChange} name="expenseDate" type="date" label="" />

      <Dropdown
        onSelectedChange={handleDropdownChange}
        options={expensesState.categories}
        value={tag}
        key="fkCategoryId"
        label="Category"
      />

      <Button
        onClick={() => handleAddExpense()}
        variant="contained"
        loading={loading}
        label="Register"
      />

      <ExpenseTable
        expensesRows={expensesState.expenseRows}
        handleDelete={handleDelete}
      />

      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={screenLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Box>
  );
};

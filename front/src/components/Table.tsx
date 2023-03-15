import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpenseRow, ExpenseForm } from "../types";
import { FC } from "react";

const getCategoryTotal = (expenses: ExpenseForm[]) => {
  let total = 0;
  expenses.forEach((expense: any) => {
    if (expense.amount) total += parseFloat(expense.amount);
  });
  
  return total.toFixed(2);
};

const getIncomeTotal = (expenses: ExpenseForm[]) => {
  let total = 0;
  expenses.forEach((expense: any) => {
    if (expense.amount && expense.fkCategoryId === 11) total += parseFloat(expense.amount);
  });

  return total.toFixed(2);
};

const getTotal = (expenses: ExpenseForm[]) => {
  let total = 0;
  expenses.forEach((expense: any) => {
    if (expense.amount && expense.fkCategoryId !== 11) total += parseFloat(expense.amount);
  });
  
  return total.toFixed(2);
};

const formatDate = (date: string) => {
  const dateArray = date.split("-");
  return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
};

const Row = (props: any) => {
  const { category, expenses, handleDelete } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{category}</TableCell>
        <TableCell align="center">{getCategoryTotal(expenses)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Expense</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense: any) => (
                    <TableRow key={expense.expenseId}>
                      <TableCell>{expense.expenseName}</TableCell>
                      <TableCell>{parseFloat(expense.amount).toFixed(2)}</TableCell>
                      <TableCell>{formatDate(expense.expenseDate)}</TableCell>
                      <TableCell
                        onClick={() => handleDelete(expense.expenseId)}
                        style={{ cursor: "pointer" }}
                        align="center"
                      >
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

type ExpenseTableProps = {
  expensesRows: ExpenseRow[];
  handleDelete: (id: number) => void;
};

export const ExpenseTable: FC<ExpenseTableProps> = ({
  expensesRows,
  handleDelete,
}) => {
  const total = getTotal(expensesRows.flatMap((row) => row.expenses));
  const income = getIncomeTotal(expensesRows.flatMap((row) => row.expenses));
  const diff = (parseFloat(income) - parseFloat(total)).toFixed(2);
  return (
    <Box sx={{ width: "25em", marginTop: "2em" }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" />
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Category Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{backgroundColor: "#FF5733"}}>
              <TableCell />
              <TableCell align="center" style={{color: "#FFFFFF"}}>Total Spent</TableCell>
              <TableCell align="center" style={{color: "#FFFFFF"}}>{total}</TableCell>
            </TableRow>
            <TableRow style={{backgroundColor: "#2196F3"}}>
              <TableCell />
              <TableCell align="center" style={{color: "#FFFFFF"}}>Total Income</TableCell>
              <TableCell align="center" style={{color: "#FFFFFF"}}>{income}</TableCell>
            </TableRow>
            <TableRow style={{backgroundColor: "#4caf50"}}>
              <TableCell />
              <TableCell align="center" style={{color: "#FFFFFF"}}>Income - Spent</TableCell>
              <TableCell align="center" style={{color: "#FFFFFF"}}>{diff}</TableCell>
            </TableRow>
            {expensesRows.map((row) => (
              <Row
                key={row.category}
                category={row.category}
                expenses={row.expenses}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

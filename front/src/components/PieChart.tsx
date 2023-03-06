import React, { FC, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { convertExpensesToPieChart } from "../redux/expenseSlice";
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: FC = () => {
  const dispatch = useDispatch();
  const expense = useSelector((state: any) => state.expense);

  useEffect(() => {
    dispatch(convertExpensesToPieChart());

    console.log(expense);
    
    
  }, []);

  return (
    <>Hello</>
  )
};

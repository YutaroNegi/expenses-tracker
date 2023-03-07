import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { If } from "./index";
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: FC = () => {
  const expense = useSelector((state: any) => state.expense);

  return (
    <>
      <If condition={expense.pieChart.labels.length > 0}>
        <Pie data={expense.pieChart} />
      </If>

      <If condition={expense.pieChart.length < 0}>
        <div>There is no data to display</div>
      </If>
    </>
  );
};

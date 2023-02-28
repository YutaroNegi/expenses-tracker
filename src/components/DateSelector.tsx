import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import { FC, useState, useEffect } from "react";
import { updateDate, convertExpensesToRows } from "../redux/expenseSlice";
import { useDispatch } from "react-redux";

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DateSelector: FC = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const handleNextMonth = () => {
    let newMonth = month;
    let newYear = year;

    if (month === 12) {
      newMonth = 1;
      newYear = year + 1;
    } else {
      newMonth = month + 1;
    }

    setMonth(newMonth);
    setYear(newYear);
    dispatch(updateDate({ month: newMonth, year: newYear }));
    dispatch(convertExpensesToRows());
  };

  const handlePreviousMonth = () => {
    let newMonth = month;
    let newYear = year;

    if (month === 1) {
      newMonth = 12;
      newYear = year - 1;
    } else {
      newMonth = month - 1;
    }

    setMonth(newMonth);
    setYear(newYear);
    dispatch(updateDate({ month: newMonth, year: newYear }));
    dispatch(convertExpensesToRows());
  };

  useEffect(() => {
    const currentDate = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };

    setMonth(currentDate.month);
    setYear(currentDate.year);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "16em",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handlePreviousMonth}
      >
        <ChevronLeftIcon sx={{ color: "primary.main" }} />
      </Box>
      <h3>
        {months[month]} - {year}
      </h3>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleNextMonth}
      >
        <ChevronRightIcon sx={{ color: "primary.main" }} />
      </Box>
    </Box>
  );
};

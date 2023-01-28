import Box from "@mui/material/Box";
import { SelectChangeEvent } from '@mui/material/Select';
import { Dropdown, Input, Button } from "../components/index";
import { ChangeEvent } from "react";
import { useState } from "react";

export const Tracker = () => {
  const [tag, setTag] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.name, e.target.value);
  };

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string);
  };

  const menuItems = [
    { value: 1, label: "Grocery" },
    { value: 2, label: "Pharmacy" },
    { value: 3, label: "Restaurant" },
    { value: 4, label: "Transportation" },
    { value: 5, label: "Other" },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Input
        onChange={handleInputChange}
        name="expense"
        type="number"
        label="Expense"
      />
      <Input
        onChange={handleInputChange}
        name="cost"
        type="number"
        label="Cost"
      />

      <Dropdown
        onSelectedChange={handleDropdownChange} 
        options={menuItems} 
        value={tag} 
        key="tag" 
        label="Tag" 
      />

      <Button
        onClick={() => console.log("clicked")}
        variant="contained"
        loading={false}
        label="Register"
      />
    </Box>
  );
};

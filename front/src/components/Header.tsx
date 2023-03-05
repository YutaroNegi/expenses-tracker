import React from "react";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout success!");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Adiciona espaçamento entre os elementos
        bgcolor: "#2196F3",
        color: "#F3F6F9",
      }}
    >
      <Box sx={{ flexGrow: 1, textAlign: "center", marginLeft: "2em" }}>
        <h1>Expenses Tracker</h1>
      </Box>

      <Box onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1, my: 0.5, cursor: "pointer" }} />
      </Box>
    </Box>
  );
};

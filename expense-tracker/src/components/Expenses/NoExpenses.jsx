import { Card } from "@mui/material";
import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const NoExpenses = () => {
  return (
    <div className="no_expenses">
      <Card variant="outlined" className="no_expenses_card">
        <ReceiptIcon style={{ fontSize: "6rem", opacity: "60%" }} />
        <h3>You have no expenses.</h3>
        <p>Create a new expense manually or scan a reciept.</p>
      </Card>
    </div>
  );
};

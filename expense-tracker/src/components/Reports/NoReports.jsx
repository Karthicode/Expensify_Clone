import { Card } from "@mui/material";
import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";

export const NoReports = () => {
  return (
    <div className="no_reports">
      <Card variant="outlined" className="no_reports_card">
        <ReceiptIcon style={{ fontSize: "6rem", opacity: "60%" }} />
        <h3>You have no reports.</h3>
        <p>
          Create a new report for an existing expense or create a new expense
          and then generate a report.
        </p>
      </Card>
    </div>
  );
};

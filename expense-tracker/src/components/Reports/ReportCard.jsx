import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

export const ReportCard = ({ report }) => {
  return (
    <div className="report_card" style={{ backgroundColor: "wheat" }}>
      <div className="report_type">
        <p>All names except unreported (Badge)</p>
        <p>Billable / Reimbursable (Badge)</p>
      </div>
      <div className="report_details">
        <h3>Shopping</h3>
        <p>Electronics and Home needs</p>
      </div>
      <div className="report_category">
        <h3>Report Category</h3>
        <p>Report Date (April 19th)</p>
      </div>
      <div className="expense_amt_date_actions">
        <div className="expense_amt_date">
          <h1>$200</h1>
        </div>
        <div className="report_actions">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

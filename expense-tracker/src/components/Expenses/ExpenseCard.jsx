import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import moment from "moment";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions, searchFilters } from "../../store/actions";
import { CreateExpenseForm } from "../Forms/CreateExpenseForm";
import CloseIcon from "@mui/icons-material/Close";
import { markExpenseAsDeleted } from "../../apicalls/expense-apicalls";
import { doc_ids } from "../../utilities/utilities";

export const ExpenseCard = (props) => {
  const {
    merchant,
    description,
    open,
    reimbursable,
    processing,
    date,
    total,
    currency,
    deleted,
    reimbursed,
    category,
  } = props.expense;

  const [dialog, setDialog] = React.useState({
    title: "",
    content: "",
    trigger: false,
  });

  const handleEditAction = () => {
    setDialog({
      trigger: true,
      title: "Edit Expense",
      content: <CreateExpenseForm editAction={true} editData={props.expense} />,
    });
  };

  const handleDeleteAction = () => {
    markExpenseAsDeleted(props.expense, doc_ids.expense_id).then((response) => {
      alert(JSON.stringify(response, null, 2));
    });
  };

  const handleCloseDialog = () => {
    setDialog({
      trigger: false,
      title: "",
      content: "",
    });
  };

  return (
    <>
      <div className="expense_card" style={{ backgroundColor: "wheat" }}>
        <div className="expense_type">
          <Chip
            label={open ? "open" : "closed"}
            color={open ? "primary" : "warning"}
            size="small"
          />
          <Chip
            label={reimbursable ? "Reimbursable" : "Billable"}
            style={{
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
            }}
            size="small"
          />
        </div>
        <div className="expense_details">
          <h3>{merchant}</h3>
          <p>{description}</p>
        </div>
        <div className="expense_category">
          <h3>{category}</h3>
          <p>{moment(date).format("MMM Do")}</p>
        </div>
        <div className="expense_amt_date_actions">
          <div className="expense_amt_date">
            <h1>{`${currency ? currency : "$"}${total}`}</h1>
          </div>
          <div className="expense_actions">
            <Button color="info" onClick={handleEditAction}>
              Edit
            </Button>
            <Button color="info" onClick={handleDeleteAction}>
              Delete
            </Button>
            <Dialog
              open={dialog.trigger}
              onClose={handleCloseDialog}
              fullWidth
              maxWidth={200}
            >
              <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {dialog.title}
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>{dialog.content}</DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

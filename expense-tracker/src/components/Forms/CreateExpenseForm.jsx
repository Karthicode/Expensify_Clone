import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { doc_ids, getDateString } from "../../utilities/utilities";
import { ImageUploadWrap } from "../Expenses/ImageUploadWrap";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions";
import { createExpense, updateExpense } from "../../apicalls/expense-apicalls";
import { getAllReports } from "../../apicalls/report-apicalls";

export const CreateExpenseForm = ({ setDialog, editAction, editData }) => {
  const [{ uploadedImage }, dispatch] = useDataFromStore();

  console.log(editData);

  const [reports, setReports] = useState([]);

  useEffect(() => {
    getAllReports(doc_ids.user_id).then((response) => {
      setReports(response.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    let payload = { ...data };

    console.log(uploadedImage);

    if (uploadedImage) {
      console.log("uploaded image");
      payload.receipt = uploadedImage;
    }

    if (editAction) {
      updateExpense(payload, doc_ids.expense_id).then((response) => {
        alert(JSON.stringify(response, null, 2));
      });
    }

    createExpense(payload, doc_ids.user_id)
      .then((response) => {
        alert(JSON.stringify(response, null, 2));
      })
      .catch((error) => alert(error));

    setDialog(false);
    dispatch({
      type: actions.REMOVE_IMAGE,
    });
  };

  const handleRemoveImage = () => {
    dispatch({
      type: actions.REMOVE_IMAGE,
      image: null,
    });
  };

  return (
    <form
      id="single_expense_form"
      className="create_expense_form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="expense_form_left">
        <div className="form-control">
          <TextField
            variant="outlined"
            helperText={
              (errors && errors.merchant && errors.merchant.message) || ""
            }
            label="Merchant"
            size="small"
            defaultValue={(editData && editData.merchant) || ""}
            {...register("merchant", { required: "Merchant is required" })}
            fullWidth
          />
        </div>
        <div className="form-control">
          <TextField
            variant="outlined"
            defaultValue={
              (editData && getDateString(editData.date)) || getDateString()
            }
            helperText={(errors && errors.date && errors.date.message) || ""}
            label="Date"
            type={"date"}
            size="small"
            fullWidth
            {...register("date", { required: "Date is required" })}
          />
        </div>
        <div className="form-control">
          <TextField
            helperText={(errors && errors.total && errors.total.message) || ""}
            variant="outlined"
            label="Total"
            type={"number"}
            defaultValue={(editData && editData.total) || ""}
            size="small"
            fullWidth
            {...register("total", {
              required: "Total is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Total must be greater than or equal to 0",
              },
            })}
          />
        </div>
        <div className="form-control">
          <FormControl fullWidth size="small">
            <InputLabel id="select-label-currency">Currency</InputLabel>
            <Select
              labelId="select-label-currency"
              id="combo-box-currencies"
              size="small"
              {...register("currency", { required: "Currency is required" })}
              defaultValue={(editData && editData.currency) || ""}
              label="Currency"
              fullWidth
            >
              {["USD", "INR"].map((value, index) => (
                <MenuItem key={index} id={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            <small
              style={{ marginLeft: "3%", opacity: "70%", fontSize: "14.5px" }}
            >
              <small>
                {(errors && errors.currency && errors.currency.message) || ""}
              </small>
            </small>
          </FormControl>
        </div>
        <div className="form-control">
          <TextField
            variant="outlined"
            label="Description"
            size="small"
            {...register("description")}
            fullWidth
          />
        </div>
        <div className="form-control">
          <Select
            id="combo-box-reports"
            size="small"
            fullWidth
            {...register("reports")}
            defaultValue={(editData && editData.reports) || ""}
          >
            <MenuItem value="unreported">Unreported</MenuItem>
            <MenuItem value="newreport">New Report</MenuItem>
            {reports.map((value, index) => (
              <MenuItem key={value._id} id={value._id} value={value._id}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div
          className="form-group"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <FormControlLabel
            style={{ marginLeft: "15%" }}
            control={<Checkbox {...register("reimbursable")} />}
            label="Reimbursable"
            defaultChecked={(editData && editData.reimbursable) || false}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ display: "block", margin: "auto" }}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {editAction ? "Update" : "Create"}
          </Button>
        </div>
      </div>
      <div className="expense_form_right">
        <div className="receipt_image">
          {uploadedImage ? (
            <>
              <img
                src={(editData && editData.receipt) || uploadedImage}
                width={400}
                height={500}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleRemoveImage}
              >
                Remove Image
              </Button>
            </>
          ) : (
            <ImageUploadWrap />
          )}
        </div>
      </div>
    </form>
  );
};

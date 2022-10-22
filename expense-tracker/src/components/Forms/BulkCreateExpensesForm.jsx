import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
//import { useForm } from "react-hook-form";
import { getDateString } from "../../utilities/utilities";

const initialFormValues = {
  merchant: "",
  date: getDateString(),
  total: 0,
  currency: "USD",
  description: "",
  report: "#noreport",
};

export const BulkCreateExpensesForm = () => {
  const [formState, setFormState] = useState(initialFormValues);
  const [formRecords, setFormRecords] = useState([
    {
      ...initialFormValues,
      form_group_id: "form-group-0",
    },
  ]);

  useEffect(() => {}, [formRecords]);
  const removeRecordFields = (e, index) => {
    setFormRecords([...formRecords].filter((item, i) => i !== index));
  };

  const stylesForGeneratedRecords = {
    display: "flex",
    justifyContent: "space-between",
    padding: "1%",
  };

  const handleCurrentRowRecords = () => {
    setFormRecords([
      ...formRecords,
      {
        ...initialFormValues,
        form_hroup_id: `form-group-${formRecords.length}`,
      },
    ]);
  };

  const handleRecordsSubmit = () => {
    console.log(formRecords);
  };

  return (
    <>
      <form className="bulkcreate_expenses_form">
        {formRecords.map((record, index) => (
          <>
            <div
              className="form-group"
              key={formState.form_group_id}
              id={formState.form_group_id}
              style={index > 0 ? stylesForGeneratedRecords : {}}
            >
              <TextField
                key={`merchant-${index}`}
                id={`merchant-${index}`}
                variant="outlined"
                label="Merchant"
                size="small"
                value={formState.merchant}
                onChange={(e) =>
                  setFormState({ ...formState, merchant: e.target.value })
                }
                style={{ width: 200 }}
                required
              />
              <TextField
                key={`date-${index}`}
                id={`date-${index}`}
                variant="outlined"
                label="Date"
                type={"date"}
                size="small"
                defaultValue={getDateString()}
                value={formState.date}
                onChange={(e) =>
                  setFormState({ ...formState, date: e.target.value })
                }
                style={{ width: index === 0 ? 250 : 150 }}
                fullWidth
                required
              />
              <TextField
                key={`total-${index}`}
                id={`total-${index}`}
                variant="outlined"
                label="Total"
                type="number"
                size="small"
                style={{ width: index === 0 ? 250 : 150 }}
                value={formState.total}
                onChange={(e) =>
                  setFormState({ ...formState, total: e.target.value })
                }
                required
              />
              <FormControl size="small">
                <InputLabel id={`select-label-currency${index}`}>
                  Currency
                </InputLabel>
                <Select
                  key={`currency-${index}`}
                  labelId={`select-label-currency${index}`}
                  id={`combo-box-currency${index}`}
                  size="small"
                  label="Currency"
                  style={{ width: 150 }}
                  value={formState.currency}
                  onChange={(e) =>
                    setFormState({ ...formState, currency: e.target.value })
                  }
                  defaultValue="USD"
                >
                  {["USD", "INR"].map((value, index) => (
                    <MenuItem
                      key={`currency-value-${index}`}
                      id={`currency-value-${index}`}
                      value={value}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                key={`description-${index}`}
                id={`description-${index}`}
                variant="outlined"
                label="Description"
                size="small"
                style={{ width: 300 }}
                value={formState.description}
                onChange={(e) =>
                  setFormState({ ...formState, description: e.target.value })
                }
              />
              <FormControl size="small">
                <InputLabel id="select-label-report">Report</InputLabel>
                <Select
                  key={`combo-box-reports-${index}`}
                  id={`combo-box-reports-${index}`}
                  labelId="select-label-report"
                  size="small"
                  label="Report"
                  defaultValue="#newreport"
                  value={formState.report}
                  onChange={(e) =>
                    setFormState({ ...formState, report: e.target.value })
                  }
                  style={{ width: 200 }}
                  fullWidth
                >
                  <MenuItem value="#noreport">Unreported</MenuItem>
                  <MenuItem value="#newreport">New Report</MenuItem>
                  {["report#1", "report#2"].map((value, index) => (
                    <MenuItem key={index} id={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                key={`remove-${index}`}
                id={`remove-${index}`}
                variant="outlined"
                color="primary"
                onClick={(e) => removeRecordFields(e, index)}
                style={{ display: index === 0 ? "none" : "block" }}
              >
                Remove
              </Button>
            </div>
            <hr />
          </>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCurrentRowRecords}
          style={{ margin: "1%" }}
        >
          Add More
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "1%" }}
          onClick={handleRecordsSubmit}
        >
          Create Multiple Expenses
        </Button>
      </form>
    </>
  );
};

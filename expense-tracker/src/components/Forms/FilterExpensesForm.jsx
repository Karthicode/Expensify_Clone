import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions/actions";
import { categories, doc_ids } from "../../utilities/utilities";
import { getMerchantNames } from "../../apicalls/expense-apicalls";

export const FilterExpensesForm = () => {
  const [{ searchFilters }, dispatch] = useDataFromStore();

  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    getMerchantNames(doc_ids.user_id).then((response) => {
      setMerchants(response.data);
    });
  }, []);

  const handleDispatch = (filter_type, value) => {
    switch (filter_type) {
      case "from_date":
        dispatch({
          type: actions.SEARCH_FILTERS,
          from_date: value,
          name: "from_date",
        });
        break;
      case "to_date":
        dispatch({
          type: actions.SEARCH_FILTERS,
          to_date: value,
          name: "to_date",
        });
        break;
      case "merchant":
        dispatch({
          type: actions.SEARCH_FILTERS,
          merchant: value,
          name: "merchant",
        });
        break;
      case "category":
        dispatch({
          type: actions.SEARCH_FILTERS,
          category: value,
          name: "category",
        });
        break;
      case "expense_type":
        dispatch({
          type: actions.SEARCH_FILTERS,
          expense_type: value,
          name: "expense_type",
        });
        break;
      case "report_type":
        dispatch({
          type: actions.SEARCH_FILTERS,
          report_type: value,
          name: "report_type",
        });
        break;
      case "sort_by":
        dispatch({
          type: actions.SEARCH_FILTERS,
          sort_by: value,
          name: "sort_by",
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className="filter_expense_form">
      <div className="filters_row1">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From"
            value={searchFilters.from_date}
            onChange={(newValue) => {
              handleDispatch("from_date", newValue);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To"
            value={searchFilters.to_date}
            onChange={(newValue) => {
              handleDispatch("to_date", newValue);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
        <FormControl size="small">
          <InputLabel id="select-label-merchants">Merchants</InputLabel>
          <Select
            labelId="select-label-merchants"
            id="combo-box-merchants"
            size="small"
            label="Merchants"
            value={searchFilters.merchant}
            onChange={(e) => {
              handleDispatch("merchant", e.target.value);
            }}
            style={{ width: 200 }}
          >
            <MenuItem value={""}>Choose a merchant</MenuItem>
            {merchants.map((value, index) => (
              <MenuItem key={value.merchant} value={value.merchant}>
                {value.merchant}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="select-label-category">Category</InputLabel>
          <Select
            labelId="select-label-category"
            id="combo-box-categories"
            size="small"
            label="Category"
            value={searchFilters.category}
            onChange={(e) => {
              handleDispatch("category", e.target.value);
            }}
            style={{ width: 200 }}
          >
            {categories.map((value, index) => (
              <MenuItem
                key={value.toLowerCase()}
                id={value.toLowerCase()}
                value={value.toLowerCase()}
              >
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="select-label-sort">Sort By</InputLabel>
          <Select
            labelId="select-label-sort"
            id="combo-box-sorts"
            size="small"
            label="Sort By"
            value={searchFilters.sort_by || "date_dsc"}
            onChange={(e) => {
              handleDispatch("sort_by", e.target.value);
            }}
            style={{ width: 200 }}
          >
            <MenuItem value="date_dsc">Date (Newest to Oldest)</MenuItem>
            <MenuItem value="date_asc">Date (Oldest to Newest)</MenuItem>
            <MenuItem value="merchant_asc">Merchant (A-Z)</MenuItem>
            <MenuItem value="merchant_dsc">Merchant (Z-A)</MenuItem>
            <MenuItem value="amount_asc">Amount (Lowest to Highest)</MenuItem>
            <MenuItem value="amount_dsc">Amount (Highest to Lowest)</MenuItem>
            <MenuItem value="category_dsc">Date (Newest to Oldest)</MenuItem>
            <MenuItem value="category_asc">Date (Oldest to Newest)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="filters_row2">
        <RadioGroup
          aria-labelledby="demo-form-control-label-placement"
          name="position"
          defaultValue="all"
          onChange={(e) => {
            handleDispatch("expense_type", e.currentTarget.value);
          }}
          row
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
          }}
        >
          <FormControlLabel
            className="radio_comp"
            value="all"
            control={
              <Radio
                icon={
                  <Chip
                    label="All"
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      border: "1px solid black",
                    }}
                    size="small"
                  />
                }
                checkedIcon={
                  <Chip
                    label="All"
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      borderRadius: "5px",
                    }}
                    size="small"
                  />
                }
              />
            }
            labelPlacement="bottom"
            checked={
              searchFilters.expense_type === "all" ||
              searchFilters.expense_type === ""
            }
          />
          <FormControlLabel
            className="radio_comp"
            value="billable"
            control={
              <Radio
                icon={
                  <Chip
                    label="Billable"
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      border: "1px solid black",
                    }}
                    size="small"
                  />
                }
                checkedIcon={
                  <Chip
                    label="Billable"
                    color="primary"
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      borderRadius: "5px",
                    }}
                    size="small"
                  />
                }
              />
            }
            labelPlacement="bottom"
            checked={searchFilters.expense_type === "billable"}
          />
          <FormControlLabel
            className="radio_comp"
            value="reimbursable"
            control={
              <Radio
                icon={
                  <Chip
                    label="Reimbursable"
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      border: "1px solid black",
                    }}
                    size="small"
                  />
                }
                checkedIcon={
                  <Chip
                    label="Reimbursable"
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      borderRadius: "5px",
                    }}
                    size="small"
                  />
                }
              />
            }
            labelPlacement="bottom"
            checked={searchFilters.expense_type === "reimbursable"}
          />
        </RadioGroup>
        <div className="checkbox_group">
          <Checkbox
            icon={
              <Chip
                label="Unreported"
                variant="outlined"
                color="default"
                size="small"
              />
            }
            checkedIcon={
              <Chip label="Unreported" color="default" size="small" />
            }
            value="unreported"
            checked={searchFilters.report_type.includes("unreported")}
            onChange={(e) => {
              handleDispatch("report_type", e.target.value);
            }}
          />

          <Checkbox
            icon={
              <Chip
                label="Open"
                variant="outlined"
                color="primary"
                size="small"
              />
            }
            checkedIcon={<Chip label="Open" color="primary" size="small" />}
            value="open"
            checked={searchFilters.report_type.includes("open")}
            onChange={(e) => {
              handleDispatch("report_type", e.target.value);
            }}
          />

          <Checkbox
            icon={
              <Chip
                label="Processing"
                variant="outlined"
                color="info"
                size="small"
              />
            }
            checkedIcon={
              <Chip label="Processing" color="secondary" size="small" />
            }
            value="processing"
            checked={searchFilters.report_type.includes("processing")}
            onChange={(e) => {
              handleDispatch("report_type", e.target.value);
            }}
          />

          <Checkbox
            icon={
              <Chip
                label="Reimbursed"
                variant="outlined"
                color="secondary"
                size="small"
              />
            }
            checkedIcon={
              <Chip label="Reimbursed" color="success" size="small" />
            }
            value="reimbursed"
            checked={searchFilters.report_type.includes("reimbursed")}
            onChange={(e) => {
              handleDispatch("report_type", e.target.value);
            }}
          />

          <Checkbox
            icon={
              <Chip
                label="Deleted"
                variant="outlined"
                color="error"
                size="small"
              />
            }
            checkedIcon={<Chip label="Deleted" color="error" size="small" />}
            value="deleted"
            checked={searchFilters.report_type.includes("deleted")}
            onChange={(e) => {
              handleDispatch("report_type", e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

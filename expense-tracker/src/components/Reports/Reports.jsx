import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions";
import { doc_ids, isSearchFilterActive } from "../../utilities/utilities";
import { FilterExpensesForm } from "../Forms/FilterExpensesForm";
import { NoReports } from "./NoReports";
import { ReportsResults } from "./ReportsResults";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { createReport } from "../../apicalls/report-apicalls";
import { getMerchantNames } from "../../apicalls/expense-apicalls";

export const Reports = () => {
  const [{ searchFilters }, dispatch] = useDataFromStore();

  const [showFilters, setShowFilters] = useState(false);

  //data coming from backend
  const [reports] = useState(["food", "entertainment", "rent"]);
  const [merchants, setMerchants] = useState([]);

  const [dialog, setDialog] = React.useState({
    title: "",
    content: "",
    trigger: false,
  });

  useEffect(() => {
    getMerchantNames(doc_ids.user_id).then((response) => {
      setMerchants(response.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      trigger: false,
    });
  };

  const handleOpenDialog = () => {
    setDialog({
      title: "Create New Report",
      trigger: true,
    });
  };

  const handleReset = () => {
    dispatch({
      type: actions.RESET_FILTERS,
      reset_filters: {
        from_date: null,
        to_date: null,
        merchant: "",
        category: "",
        expense_type: "",
        report_type: [],
        sort_by: "",
      },
    });
    setShowFilters(false);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    createReport(
      {
        name: data.merchants,
        report: "link for report ====> 2.0",
      },
      doc_ids.expense_id,
      doc_ids.user_id
    ).then((response) => {
      alert(JSON.stringify(response, null, 2));
    });
  };

  return (
    <>
      <section className="reports_section">
        <div className="reports_actions">
          <div className="reports_buttons">
            <div className="filters_and_reset">
              <Button
                variant="outlined"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterAltIcon />
                Show Filters
              </Button>
              <Button
                variant="outlined"
                color="warning"
                size="small"
                onClick={handleReset}
                style={{
                  display: isSearchFilterActive(searchFilters)
                    ? "block"
                    : "none",
                }}
              >
                Reset
              </Button>
            </div>
            <Button
              color="primary"
              variant="contained"
              onClick={handleOpenDialog}
            >
              New Report
            </Button>
          </div>
          <div className="reports_filters">
            <div
              style={{
                display: showFilters ? "block" : "none",
              }}
            >
              <FilterExpensesForm />
            </div>
          </div>
        </div>
        <div className="expenses_responses">
          {reports.length > 0 ? (
            <ReportsResults reports={reports} />
          ) : (
            <NoReports />
          )}
        </div>
      </section>
      <Dialog open={dialog.trigger} onClose={handleCloseDialog} fullWidth>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong style={{ fontSize: "2rem", fontWeight: "lighter" }}>
            {dialog.title}
          </strong>
          <Tooltip title="Close Dialog">
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "30px",
            }}
          >
            <FormControl>
              <InputLabel id="select-label-merchants">Merchants</InputLabel>
              <Select
                labelId="select-label-merchants"
                id="combo-box-merchants"
                label="Merchants"
                style={{ width: 300 }}
                {...register("merchants")}
                defaultValue="Merchant #1"
              >
                {merchants.map((value, index) => (
                  <MenuItem
                    key={value.merchant}
                    id={value.merchant}
                    value={value.merchant}
                  >
                    {value.merchant}
                  </MenuItem>
                ))}
              </Select>
              <small
                style={{ marginLeft: "3%", opacity: "70%", fontSize: "14.5px" }}
              >
                <small>
                  {(errors && errors.merchants && errors.merchants.message) ||
                    ""}
                </small>
              </small>
            </FormControl>
            <Button
              color="info"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Create Report
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

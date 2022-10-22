import React, { useEffect, useState } from "react";
import { NoExpenses } from "./NoExpenses";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ExpensesDropdown from "../MUIComponents/ExpensesDropdown";
import { FilterExpensesForm } from "../Forms/FilterExpensesForm";
import { ExpensesResults } from "./ExpensesResults";
import {
  doc_ids,
  initialFilters,
  isSearchFilterActive,
} from "../../utilities/utilities";
import { actions, resetSearchFilters } from "../../store/actions";
import { useDataFromStore } from "../../store/state/StateProvider";
import { groupedUserData } from "../../apicalls/user-apicalls";
import {
  getAllExpenses,
  getExpensesBySearchFilters,
} from "../../apicalls/expense-apicalls";
import { ExpenseCard } from "./ExpenseCard";
// import "../../styles/dist/App.css";

export const Expenses = () => {
  const [{ searchFilters, user, uploadedImage }, dispatch] = useDataFromStore();

  console.log(searchFilters);

  const [showFilters, setShowFilters] = useState(false);

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (JSON.stringify(searchFilters) === JSON.stringify(initialFilters)) {
      console.log("rendered back previous data ====> filters were reset");
      getAllExpenses(doc_ids.user_id).then((response) => {
        setExpenses(response.data);
      });
      console.log(expenses);
    } else {
      console.log("rendering filtered data ====> ");
      getExpensesBySearchFilters(searchFilters, doc_ids.user_id).then(
        (response) => {
          setExpenses(response.data);
        }
      );
      console.log(expenses);
    }
  }, [searchFilters]);

  const handleReset = () => {
    dispatch({
      type: actions.RESET_FILTERS,
      reset_filters: {
        ...initialFilters,
      },
    });

    setShowFilters(false);
  };

  return (
    <>
      <section className="expenses_section">
        <div className="expenses_actions">
          <div className="expenses_buttons">
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
            <ExpensesDropdown />
          </div>
          <div className="expenses_filters">
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
          {expenses.length > 0 ? (
            <div className="expense_results_section">
              {expenses.map((expense) => (
                <ExpenseCard expense={expense} />
              ))}
            </div>
          ) : (
            <NoExpenses />
          )}
        </div>
      </section>
    </>
  );
};

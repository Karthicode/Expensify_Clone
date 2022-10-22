import React, { useEffect, useState } from "react";
import { ExpenseCard } from "./ExpenseCard";
import { useDataFromStore } from "../../store/state/StateProvider";
import { getExpensesBySearchFilters } from "../../apicalls/expense-apicalls";
import { initialFilters } from "../../utilities/utilities";
import { groupedUserData } from "../../apicalls/user-apicalls";

export const ExpensesResults = ({ expenses }) => {
  const [{ searchFilters, user }, dispatch] = useDataFromStore();

  return (
    <div className="expense_results_section">
      {expenses.map((expense) => (
        <ExpenseCard expense={expense} />
      ))}
    </div>
  );
};

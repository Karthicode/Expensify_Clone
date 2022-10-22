import { Expense, User } from "../models/index";
import { pagination } from "./../utils/response-util";
import { addReport } from "./report-service";

const { LIMIT, OFFSET } = pagination;

/**
 * @param {*} newData
 * @returns {Promise<Expense>}
 */

//invoked for adding a new expense to the collection
export const addExpense = (newData: any) => {
  const { user_id } = newData;
  if (user_id === "undefined") {
    return {
      message: "cannot add expense for an invalid user",
    };
  }

  let createReport = false;

  if (newData.reports) {
    if (newData.reports === "newreport") createReport = true;
    else if (newData.reports === "unreported") createReport = false;
    else {
      createReport = true;
    }
  }

  delete newData.reports;

  const expense = new Expense(newData);

  expense.open = true; //makes an expense as an open expense.
  expense.processing = true; //remains true until manualy closed / set as reimbursed

  expense.save().then((createdExpense) => {
    if (createReport) {
      addReport({
        name: createdExpense.merchant + " Report",
        report: "report link",
        expense_id: createdExpense.id,
        user_id: user_id,
      });
    }
  });
  addExpenseInUser(expense, expense.user_id);

  return expense;
};

//invoked for updating the expense details
export const updateExpense = async (newData: any, id: string) => {
  const expense = Expense.findByIdAndUpdate(id, newData, { new: true }).exec();
  return expense.then((expense) => {
    if (expense) {
      //if a billable expense is marked as closed
      if (!newData.open) {
        expense.open = false;
        expense.processing = false;
      }

      //if a reimbursable expense is marked as reimbursed
      else if (newData.reimbursable) {
        expense.reimbursed = true;
        expense.processing = false;
      }
      expense.save();
      return expense;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

//invoked for finding an existing expense record
export const findExpenseById = async (id: string) => {
  const expense = Expense.findById(id).exec();
  return expense.then((expense) => {
    if (expense) {
      return expense;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

//invoked for deleting an existing expense
export const deleteExpenseById = async (id: string, user_id: any) => {
  const expense = Expense.findByIdAndDelete(id).exec();
  return expense.then((expense) => {
    if (expense) {
      return expense;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

//invoked for deleting all expenses
export const deleteAllExpenses = (user_id: any) => {
  User.findByIdAndUpdate(
    user_id,
    {
      $set: {
        expenses: [],
      },
    },
    { new: true }
  ).exec();
  const expenses = Expense.deleteMany().exec();
  return expenses.then((expenses) => {
    if (expenses.deletedCount > 0) {
      return expenses;
    } else {
      return {
        message: "no records found",
      };
    }
  });
};

//invoked for finding all expenses
export const findAllExpenses = (user_id: any) => {
  const expenses = Expense.find({ user_id: user_id }).exec();
  return expenses.then((expenses) => {
    if (expenses.length > 0) {
      return expenses;
    } else {
      return {
        message: "no records found",
      };
    }
  });
};

//this is invoked immediately after adding a new expense to update the expenses array inside the user model
export const addExpenseInUser = (expense: any, user_id: string) => {
  const user = User.findByIdAndUpdate(
    { _id: user_id },
    {
      $push: {
        expenses: expense,
      },
    },
    { new: true }
  ).exec();
  return user
    .then((updatedExpenseInUser) => {
      if (updatedExpenseInUser) {
        return updatedExpenseInUser;
      } else {
        return {
          message: "user record not found",
        };
      }
    })
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

//this is invoked immediately after adding a new expense to update the expenses array inside the user model
export const deleteExpenseInUser = (expense_id: any, user_id: string) => {
  return User.findByIdAndUpdate(
    { _id: user_id },
    {
      $pull: {
        expenses: expense_id,
      },
    },
    { new: true }
  )
    .exec()
    .then((updatedExpenseInUser) => {
      if (updatedExpenseInUser) {
        return updatedExpenseInUser;
      } else {
        return {
          message: "user record not found",
        };
      }
    })
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

//search filter query
export const findExpensesBySearchFilters = (filters: any, user_id: any) => {
  //empty object
  let searchFilters: any = {};
  searchFilters.$and = [];

  //setting the value of reimbursable if provided
  if (filters?.expense_type) {
    if (filters.expense_type === "billable") {
      searchFilters.reimbursable = false;
    } else if (filters.expense_type === "reimbursable") {
      searchFilters.reimbursable = true;
    }
  }

  //setting the value of merchant if provided
  if (filters?.merchant) {
    searchFilters.merchant = filters?.merchant;
  }

  //setting the value of category if provided
  if (filters?.category) {
    searchFilters.category = filters?.category;
  }

  //setting the values of open, processing, reimbursed, deleted if provided
  if (filters?.report_type) {
    if (filters?.report_type.includes("unreported")) {
      searchFilters.$and.push({
        reports: { $exists: true, $size: 0 },
      });
    }

    if (filters?.report_type.includes("processing")) {
      searchFilters.$and.push({
        processing: true,
      });
    }

    if (filters?.report_type.includes("reimbursed")) {
      searchFilters.$and.push({
        reimbursed: true,
      });
    }

    if (filters?.report_type.includes("deleted")) {
      searchFilters.$and.push({
        deleted: true,
      });
    }
  }

  //setting the values if both from_date and to_date are provided
  if (filters?.from_date && filters.to_date) {
    //pushing this result to $and[] array
    searchFilters.$and.push({
      date: {
        $gte: new Date(filters.from_date),
      },
    });

    //pushing this result to $and[] array
    searchFilters.$and.push({
      date: {
        $lte: new Date(filters?.to_date),
      },
    });
  }

  //else if only from_date is provided
  else if (filters?.from_date) {
    searchFilters.$and.push({
      date: {
        $gte: new Date(filters.from_date),
      },
    });
  }

  //else if only to_date is provided
  else if (filters?.to_date) {
    searchFilters.$and.push({
      date: {
        $lte: new Date(filters.to_date),
      },
    });
  }

  let sort_by = {};

  if (filters?.sort_by) {
    if (filters.sort_by === "date_asc") {
      sort_by = {
        date: "asc",
      };
    } else if (filters.sort_by === "date_dsc") {
      sort_by = {
        date: "desc",
      };
    } else if (filters.sort_by === "amount_asc") {
      sort_by = {
        total: "asc",
      };
    } else if (filters.sort_by === "amount_dsc") {
      sort_by = {
        total: "desc",
      };
    } else if (filters.sort_by === "merchant_dsc") {
      sort_by = {
        merchant: "desc",
      };
    } else if (filters.sort_by === "merchant_asc") {
      sort_by = {
        merchant: "asc",
      };
    } else if (filters.sort_by === "category_asc") {
      sort_by = {
        category: "asc",
      };
    } else if (filters.sort_by === "category_dsc") {
      sort_by = {
        category: "desc",
      };
    } else {
      sort_by = {
        date: "desc",
      };
    }
  }

  console.log(searchFilters);

  if (searchFilters.$and.length === 0) delete searchFilters.$and;

  return Expense.find({
    ...searchFilters,
    user_id: user_id,
  })
    .sort({ ...sort_by })
    .exec();
};

//marking expense as delete will not delete the expense from the database

export const markExpenseAsDeleted = (expenseData: any, expense_id: any) => {
  const expense = Expense.findByIdAndUpdate(expense_id, expenseData, {
    new: true,
  }).exec();
  return expense.then((exp) => {
    if (exp?.reimbursable) {
      //marking an expense as deleted irrespective of that being a billable / reimbursable expense
      exp.deleted = true;

      if (exp.reimbursed) {
        //marking processing and open as false for a deleted reimbursable expense which has been reimbursed
        exp.processing = false;
        exp.open = false;
      } else {
        //marking processing and open as true for a deleted billable expense which has not been closed yet
        exp.processing = true;
        exp.open = true;
      }
      exp.save();
      return exp;
    }
  });
};

export const findMerchantNamesOfAUser = (user_id: any) => {
  return Expense.find({
    user_id: user_id,
  })
    .exec()
    .then((userExpenses) => {
      return userExpenses.map((expense, index) => {
        return {
          merchant_id: expense.merchant + index,
          merchant: expense.merchant,
        };
      });
    });
};

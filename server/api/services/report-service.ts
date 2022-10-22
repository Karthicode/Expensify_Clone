import { Expense, Report, User } from "../models/index";

/**
 * @param {*} newData
 * @returns {Promise<Report>}
 */

//invoked for adding a new report to the collection
export const addReport = (newData: any) => {
  const { expense_id } = newData;

  if (expense_id === "undefined") {
    return {
      message: "invalid expense id",
    };
  }
  const report = new Report(newData);
  report.save();
  addReportInExpense(report, expense_id);
  return report;
};

//update the report details
export const updateReport = (newData: object, id: string) => {
  const report = Report.findByIdAndUpdate(id, newData, { new: true }).exec();
  return report.then((report) => {
    if (report) {
      return report;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

//finds and existing report record
export const findReportById = (id: string) => {
  const report = Report.findById(id).exec();
  return report.then((report) => {
    if (report) {
      return report;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

export const deleteReportById = (id: string) => {
  const report = Report.findByIdAndDelete(id).exec();
  return report.then((report) => {
    if (report) {
      return report;
    } else {
      return {
        message: "no record found",
      };
    }
  });
};

export const deleteAllReports = (expense_id: any) => {
  //deletes all the reports related to an expense of the current user
  Expense.findByIdAndUpdate(
    expense_id,
    {
      $set: {
        reports: [],
      },
    },
    { new: true }
  ).exec();
  const Reports = Report.deleteMany({ expense_id: expense_id }).exec();
  return Reports.then((Reports) => {
    if (Reports.acknowledged) {
      return Reports;
    } else {
      return {
        message: `no records found for expense id ${expense_id}`,
      };
    }
  });
};

export const findAllReports = (user_id: any) => {
  const Reports = Report.find({ user_id: user_id }).exec();
  return Reports.then((Reports) => {
    if (Reports.length > 0) {
      return Reports;
    } else {
      return {
        message: "no records found",
      };
    }
  });
};

//this is invoked immediately after adding a new expense to update the reports array inside the expense model
export const addReportInExpense = (report: any, expense_id: string) => {
  const expense = Expense.findByIdAndUpdate(
    { _id: expense_id },
    {
      $push: {
        reports: report,
      },
    },
    { new: true }
  ).exec();
  return expense
    .then((updatedReportInExpense) => {
      if (updatedReportInExpense) {
        return updatedReportInExpense;
      } else {
        return {
          message: "expense record not found",
        };
      }
    })
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

//this is invoked immediately after deleting a report to update the reports array inside the expense model
export const deleteReportInExpense = (report_id: any, expense_id: any) => {
  const expense = Expense.findByIdAndUpdate(
    { _id: expense_id },
    {
      $pull: {
        reports: report_id,
      },
    },
    { new: true }
  ).exec();
  return expense
    .then((updatedReportInExpense) => {
      if (updatedReportInExpense) {
        return updatedReportInExpense;
      } else {
        return {
          message: "expense record not found",
        };
      }
    })
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

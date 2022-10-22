"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReportInExpense = exports.addReportInExpense = exports.findAllReports = exports.deleteAllReports = exports.deleteReportById = exports.findReportById = exports.updateReport = exports.addReport = void 0;
const index_1 = require("../models/index");
/**
 * @param {*} newData
 * @returns {Promise<Report>}
 */
//invoked for adding a new report to the collection
const addReport = (newData) => {
    const { expense_id } = newData;
    if (expense_id === "undefined") {
        return {
            message: "invalid expense id",
        };
    }
    const report = new index_1.Report(newData);
    report.save();
    (0, exports.addReportInExpense)(report, expense_id);
    return report;
};
exports.addReport = addReport;
//update the report details
const updateReport = (newData, id) => {
    const report = index_1.Report.findByIdAndUpdate(id, newData, { new: true }).exec();
    return report.then((report) => {
        if (report) {
            return report;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
};
exports.updateReport = updateReport;
//finds and existing report record
const findReportById = (id) => {
    const report = index_1.Report.findById(id).exec();
    return report.then((report) => {
        if (report) {
            return report;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
};
exports.findReportById = findReportById;
const deleteReportById = (id) => {
    const report = index_1.Report.findByIdAndDelete(id).exec();
    return report.then((report) => {
        if (report) {
            return report;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
};
exports.deleteReportById = deleteReportById;
const deleteAllReports = (expense_id) => {
    //deletes all the reports related to an expense of the current user
    index_1.Expense.findByIdAndUpdate(expense_id, {
        $set: {
            reports: [],
        },
    }, { new: true }).exec();
    const Reports = index_1.Report.deleteMany({ expense_id: expense_id }).exec();
    return Reports.then((Reports) => {
        if (Reports.acknowledged) {
            return Reports;
        }
        else {
            return {
                message: `no records found for expense id ${expense_id}`,
            };
        }
    });
};
exports.deleteAllReports = deleteAllReports;
const findAllReports = (user_id) => {
    const Reports = index_1.Report.find({ user_id: user_id }).exec();
    return Reports.then((Reports) => {
        if (Reports.length > 0) {
            return Reports;
        }
        else {
            return {
                message: "no records found",
            };
        }
    });
};
exports.findAllReports = findAllReports;
//this is invoked immediately after adding a new expense to update the reports array inside the expense model
const addReportInExpense = (report, expense_id) => {
    const expense = index_1.Expense.findByIdAndUpdate({ _id: expense_id }, {
        $push: {
            reports: report,
        },
    }, { new: true }).exec();
    return expense
        .then((updatedReportInExpense) => {
        if (updatedReportInExpense) {
            return updatedReportInExpense;
        }
        else {
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
exports.addReportInExpense = addReportInExpense;
//this is invoked immediately after deleting a report to update the reports array inside the expense model
const deleteReportInExpense = (report_id, expense_id) => {
    const expense = index_1.Expense.findByIdAndUpdate({ _id: expense_id }, {
        $pull: {
            reports: report_id,
        },
    }, { new: true }).exec();
    return expense
        .then((updatedReportInExpense) => {
        if (updatedReportInExpense) {
            return updatedReportInExpense;
        }
        else {
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
exports.deleteReportInExpense = deleteReportInExpense;

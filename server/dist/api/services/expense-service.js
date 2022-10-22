"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMerchantNamesOfAUser = exports.markExpenseAsDeleted = exports.findExpensesBySearchFilters = exports.deleteExpenseInUser = exports.addExpenseInUser = exports.findAllExpenses = exports.deleteAllExpenses = exports.deleteExpenseById = exports.findExpenseById = exports.updateExpense = exports.addExpense = void 0;
const index_1 = require("../models/index");
const response_util_1 = require("./../utils/response-util");
const report_service_1 = require("./report-service");
const { LIMIT, OFFSET } = response_util_1.pagination;
/**
 * @param {*} newData
 * @returns {Promise<Expense>}
 */
//invoked for adding a new expense to the collection
const addExpense = (newData) => {
    const { user_id } = newData;
    if (user_id === "undefined") {
        return {
            message: "cannot add expense for an invalid user",
        };
    }
    let createReport = false;
    if (newData.reports) {
        if (newData.reports === "newreport")
            createReport = true;
        else if (newData.reports === "unreported")
            createReport = false;
        else {
            createReport = true;
        }
    }
    delete newData.reports;
    const expense = new index_1.Expense(newData);
    expense.open = true; //makes an expense as an open expense.
    expense.processing = true; //remains true until manualy closed / set as reimbursed
    expense.save().then((createdExpense) => {
        if (createReport) {
            (0, report_service_1.addReport)({
                name: createdExpense.merchant + " Report",
                report: "report link",
                expense_id: createdExpense.id,
                user_id: user_id,
            });
        }
    });
    (0, exports.addExpenseInUser)(expense, expense.user_id);
    return expense;
};
exports.addExpense = addExpense;
//invoked for updating the expense details
const updateExpense = (newData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = index_1.Expense.findByIdAndUpdate(id, newData, { new: true }).exec();
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
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
});
exports.updateExpense = updateExpense;
//invoked for finding an existing expense record
const findExpenseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = index_1.Expense.findById(id).exec();
    return expense.then((expense) => {
        if (expense) {
            return expense;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
});
exports.findExpenseById = findExpenseById;
//invoked for deleting an existing expense
const deleteExpenseById = (id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = index_1.Expense.findByIdAndDelete(id).exec();
    return expense.then((expense) => {
        if (expense) {
            return expense;
        }
        else {
            return {
                message: "no record found",
            };
        }
    });
});
exports.deleteExpenseById = deleteExpenseById;
//invoked for deleting all expenses
const deleteAllExpenses = (user_id) => {
    index_1.User.findByIdAndUpdate(user_id, {
        $set: {
            expenses: [],
        },
    }, { new: true }).exec();
    const expenses = index_1.Expense.deleteMany().exec();
    return expenses.then((expenses) => {
        if (expenses.deletedCount > 0) {
            return expenses;
        }
        else {
            return {
                message: "no records found",
            };
        }
    });
};
exports.deleteAllExpenses = deleteAllExpenses;
//invoked for finding all expenses
const findAllExpenses = (user_id) => {
    const expenses = index_1.Expense.find({ user_id: user_id }).exec();
    return expenses.then((expenses) => {
        if (expenses.length > 0) {
            return expenses;
        }
        else {
            return {
                message: "no records found",
            };
        }
    });
};
exports.findAllExpenses = findAllExpenses;
//this is invoked immediately after adding a new expense to update the expenses array inside the user model
const addExpenseInUser = (expense, user_id) => {
    const user = index_1.User.findByIdAndUpdate({ _id: user_id }, {
        $push: {
            expenses: expense,
        },
    }, { new: true }).exec();
    return user
        .then((updatedExpenseInUser) => {
        if (updatedExpenseInUser) {
            return updatedExpenseInUser;
        }
        else {
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
exports.addExpenseInUser = addExpenseInUser;
//this is invoked immediately after adding a new expense to update the expenses array inside the user model
const deleteExpenseInUser = (expense_id, user_id) => {
    return index_1.User.findByIdAndUpdate({ _id: user_id }, {
        $pull: {
            expenses: expense_id,
        },
    }, { new: true })
        .exec()
        .then((updatedExpenseInUser) => {
        if (updatedExpenseInUser) {
            return updatedExpenseInUser;
        }
        else {
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
exports.deleteExpenseInUser = deleteExpenseInUser;
//search filter query
const findExpensesBySearchFilters = (filters, user_id) => {
    //empty object
    let searchFilters = {};
    searchFilters.$and = [];
    //setting the value of reimbursable if provided
    if (filters === null || filters === void 0 ? void 0 : filters.expense_type) {
        if (filters.expense_type === "billable") {
            searchFilters.reimbursable = false;
        }
        else if (filters.expense_type === "reimbursable") {
            searchFilters.reimbursable = true;
        }
    }
    //setting the value of merchant if provided
    if (filters === null || filters === void 0 ? void 0 : filters.merchant) {
        searchFilters.merchant = filters === null || filters === void 0 ? void 0 : filters.merchant;
    }
    //setting the value of category if provided
    if (filters === null || filters === void 0 ? void 0 : filters.category) {
        searchFilters.category = filters === null || filters === void 0 ? void 0 : filters.category;
    }
    //setting the values of open, processing, reimbursed, deleted if provided
    if (filters === null || filters === void 0 ? void 0 : filters.report_type) {
        if (filters === null || filters === void 0 ? void 0 : filters.report_type.includes("unreported")) {
            searchFilters.$and.push({
                reports: { $exists: true, $size: 0 },
            });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.report_type.includes("processing")) {
            searchFilters.$and.push({
                processing: true,
            });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.report_type.includes("reimbursed")) {
            searchFilters.$and.push({
                reimbursed: true,
            });
        }
        if (filters === null || filters === void 0 ? void 0 : filters.report_type.includes("deleted")) {
            searchFilters.$and.push({
                deleted: true,
            });
        }
    }
    //setting the values if both from_date and to_date are provided
    if ((filters === null || filters === void 0 ? void 0 : filters.from_date) && filters.to_date) {
        //pushing this result to $and[] array
        searchFilters.$and.push({
            date: {
                $gte: new Date(filters.from_date),
            },
        });
        //pushing this result to $and[] array
        searchFilters.$and.push({
            date: {
                $lte: new Date(filters === null || filters === void 0 ? void 0 : filters.to_date),
            },
        });
    }
    //else if only from_date is provided
    else if (filters === null || filters === void 0 ? void 0 : filters.from_date) {
        searchFilters.$and.push({
            date: {
                $gte: new Date(filters.from_date),
            },
        });
    }
    //else if only to_date is provided
    else if (filters === null || filters === void 0 ? void 0 : filters.to_date) {
        searchFilters.$and.push({
            date: {
                $lte: new Date(filters.to_date),
            },
        });
    }
    let sort_by = {};
    if (filters === null || filters === void 0 ? void 0 : filters.sort_by) {
        if (filters.sort_by === "date_asc") {
            sort_by = {
                date: "asc",
            };
        }
        else if (filters.sort_by === "date_dsc") {
            sort_by = {
                date: "desc",
            };
        }
        else if (filters.sort_by === "amount_asc") {
            sort_by = {
                total: "asc",
            };
        }
        else if (filters.sort_by === "amount_dsc") {
            sort_by = {
                total: "desc",
            };
        }
        else if (filters.sort_by === "merchant_dsc") {
            sort_by = {
                merchant: "desc",
            };
        }
        else if (filters.sort_by === "merchant_asc") {
            sort_by = {
                merchant: "asc",
            };
        }
        else if (filters.sort_by === "category_asc") {
            sort_by = {
                category: "asc",
            };
        }
        else if (filters.sort_by === "category_dsc") {
            sort_by = {
                category: "desc",
            };
        }
        else {
            sort_by = {
                date: "desc",
            };
        }
    }
    console.log(searchFilters);
    if (searchFilters.$and.length === 0)
        delete searchFilters.$and;
    return index_1.Expense.find(Object.assign(Object.assign({}, searchFilters), { user_id: user_id }))
        .sort(Object.assign({}, sort_by))
        .exec();
};
exports.findExpensesBySearchFilters = findExpensesBySearchFilters;
//marking expense as delete will not delete the expense from the database
const markExpenseAsDeleted = (expenseData, expense_id) => {
    const expense = index_1.Expense.findByIdAndUpdate(expense_id, expenseData, {
        new: true,
    }).exec();
    return expense.then((exp) => {
        if (exp === null || exp === void 0 ? void 0 : exp.reimbursable) {
            //marking an expense as deleted irrespective of that being a billable / reimbursable expense
            exp.deleted = true;
            if (exp.reimbursed) {
                //marking processing and open as false for a deleted reimbursable expense which has been reimbursed
                exp.processing = false;
                exp.open = false;
            }
            else {
                //marking processing and open as true for a deleted billable expense which has not been closed yet
                exp.processing = true;
                exp.open = true;
            }
            exp.save();
            return exp;
        }
    });
};
exports.markExpenseAsDeleted = markExpenseAsDeleted;
const findMerchantNamesOfAUser = (user_id) => {
    return index_1.Expense.find({
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
exports.findMerchantNamesOfAUser = findMerchantNamesOfAUser;

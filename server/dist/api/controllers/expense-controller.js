"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getMerchantNamesController = exports.markExpenseAsDeletedController = exports.findAllBySearchFiltersController = exports.findAllController = exports.deleteAllController = exports.deleteExpenseController = exports.findExpenseController = exports.editExpenseController = exports.addExpenseController = void 0;
const ExpenseService = __importStar(require("../services/expense-service"));
const response_util_1 = require("../utils/response-util");
//invokes addExpense() service
const addExpenseController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const { user_id } = request.query;
        const addExpenseData = yield ExpenseService.addExpense(Object.assign(Object.assign({}, payload), { user_id }));
        (0, response_util_1.setSuccessReponse)(addExpenseData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.addExpenseController = addExpenseController;
//invokes updateExpense() service
const editExpenseController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const id = request.params.id;
        const editExpenseData = yield ExpenseService.updateExpense(payload, id);
        (0, response_util_1.setSuccessReponse)(editExpenseData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.editExpenseController = editExpenseController;
//triggers findExpenseById() service
const findExpenseController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id;
        const getExpenseData = yield ExpenseService.findExpenseById(id);
        (0, response_util_1.setSuccessReponse)(getExpenseData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.findExpenseController = findExpenseController;
//invokes deleteExpenseById() service
const deleteExpenseController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = request.params) === null || _b === void 0 ? void 0 : _b.id;
        const { user_id } = request.query;
        const deleteExpenseData = yield ExpenseService.deleteExpenseById(id, user_id);
        yield ExpenseService.deleteExpenseInUser(deleteExpenseData._id, deleteExpenseData.user_id);
        (0, response_util_1.setSuccessReponse)(deleteExpenseData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.deleteExpenseController = deleteExpenseController;
//invokes deleteAllExpenses() service
const deleteAllController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = request.query;
        const deleteAllExpenses = yield ExpenseService.deleteAllExpenses(user_id);
        (0, response_util_1.setSuccessReponse)(deleteAllExpenses, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.deleteAllController = deleteAllController;
//invokes findAllExpenses() service
const findAllController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = request.query.user_id;
        const { limit, offset } = request.query;
        const findAllExpenses = yield ExpenseService.findAllExpenses(user_id);
        (0, response_util_1.setSuccessReponse)(findAllExpenses, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.findAllController = findAllController;
//invokes findExpensesBySearchFilters() service
const findAllBySearchFiltersController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const { limit, offset, user_id } = request.query;
        const getFetchedData = yield ExpenseService.findExpensesBySearchFilters(payload, user_id);
        console.log(getFetchedData);
        (0, response_util_1.setSuccessReponse)(getFetchedData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.findAllBySearchFiltersController = findAllBySearchFiltersController;
const markExpenseAsDeletedController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request.body;
        const { expense_id } = request.query;
        const markAsDeleted = yield ExpenseService.markExpenseAsDeleted(payload, expense_id);
        (0, response_util_1.setSuccessReponse)(markAsDeleted, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.markExpenseAsDeletedController = markExpenseAsDeletedController;
const getMerchantNamesController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = request.query.user_id;
        const findMerchants = yield ExpenseService.findMerchantNamesOfAUser(user_id);
        (0, response_util_1.setSuccessReponse)(findMerchants, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.getMerchantNamesController = getMerchantNamesController;

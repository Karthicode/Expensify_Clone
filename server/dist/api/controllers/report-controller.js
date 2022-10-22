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
exports.findAllController = exports.deleteAllController = exports.deleteReportController = exports.findReportController = exports.editReportController = exports.addReportController = void 0;
const ReportService = __importStar(require("../services/report-service"));
const response_util_1 = require("../utils/response-util");
//invokes addReport() service
const addReportController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const { expense_id, user_id } = request.query;
        const addReportData = yield ReportService.addReport(Object.assign(Object.assign({}, payload), { expense_id,
            user_id }));
        (0, response_util_1.setSuccessReponse)(addReportData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.addReportController = addReportController;
//invokes updateReport() service
const editReportController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const id = request.params.id;
        const editReportData = yield ReportService.updateReport(payload, id);
        (0, response_util_1.setSuccessReponse)(editReportData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.editReportController = editReportController;
//triggers findReportById() service
const findReportController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id;
        const getReportData = yield ReportService.findReportById(id);
        (0, response_util_1.setSuccessReponse)(getReportData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.findReportController = findReportController;
//invokes deleteReportById() service
const deleteReportController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = request.params) === null || _b === void 0 ? void 0 : _b.id;
        // const { expense_id } = request.query;
        const deletedReport = yield ReportService.deleteReportById(id);
        yield ReportService.deleteReportInExpense(deletedReport._id, deletedReport.expense_id);
        (0, response_util_1.setSuccessReponse)(deletedReport, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.deleteReportController = deleteReportController;
//invokes deleteAllReports() service
const deleteAllController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { expense_id } = request.query;
        const deleteAllReports = yield ReportService.deleteAllReports(expense_id);
        (0, response_util_1.setSuccessReponse)(deleteAllReports, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.deleteAllController = deleteAllController;
//invokes findAllReports() service
const findAllController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = request.query.user_id;
        const findAllReports = yield ReportService.findAllReports(user_id);
        (0, response_util_1.setSuccessReponse)(findAllReports, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.findAllController = findAllController;

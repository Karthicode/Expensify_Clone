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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//imports all exported members
const UserController = __importStar(require("../controllers/user-controller"));
const ExpenseController = __importStar(require("../controllers/expense-controller"));
const ReportController = __importStar(require("../controllers/report-controller"));
const AuthController = __importStar(require("../controllers/auth-controller"));
//creates a new Router object
const router = express_1.default.Router();
//triggers for REST API methods on auth routes.
router.route("/register").post(AuthController.newUserController);
router.route("/login").post(AuthController.handleLoginController);
router.route("/forgot-password").put(AuthController.forgotPasswordController);
router
    .route("/reset-password/:token")
    .put(AuthController.resetPasswordController);
//triggers for specified REST API methods on /user route
router
    .route("/user")
    .post(UserController.addUserController)
    .get(UserController.findAllController)
    .delete(UserController.deleteAllController);
router
    .route("/user/:id")
    .get(UserController.findUserController)
    .put(UserController.editUserController)
    .delete(UserController.deleteUserController);
//triggers for specified REST API methods on /expense route
router
    .route("/expense")
    .post(ExpenseController.addExpenseController)
    .get(ExpenseController.findAllController)
    .delete(ExpenseController.deleteAllController);
router
    .route("/expense/:id")
    .get(ExpenseController.findExpenseController)
    .put(ExpenseController.editExpenseController)
    .delete(ExpenseController.deleteExpenseController);
//triggers for specified REST API methods on /report route
router
    .route("/report")
    .post(ReportController.addReportController)
    .get(ReportController.findAllController)
    .delete(ReportController.deleteAllController);
router
    .route("/report/:id")
    .get(ReportController.findReportController)
    .put(ReportController.editReportController)
    .delete(ReportController.deleteReportController);
router.route("/search").get(ExpenseController.findAllBySearchFiltersController);
router
    .route("/mark-as-delete")
    .put(ExpenseController.markExpenseAsDeletedController);
router
    .route("/grouped-user-data")
    .get(UserController.groupedUserDataController);
router.route("/dashboard-data").get(UserController.getDashboardDataController);
router.route("/merchants").get(ExpenseController.getMerchantNamesController);
exports.default = router;

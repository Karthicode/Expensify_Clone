import express from "express";

//imports all exported members
import * as UserController from "../controllers/user-controller";
import * as ExpenseController from "../controllers/expense-controller";
import * as ReportController from "../controllers/report-controller";
import * as AuthController from "../controllers/auth-controller";

//creates a new Router object
const router = express.Router();

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

export default router;

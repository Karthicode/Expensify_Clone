import express from "express";
import * as ExpenseService from "../services/expense-service";
import { setErrorReponse, setSuccessReponse } from "../utils/response-util";

//invokes addExpense() service
export const addExpenseController = async (
  request: express.Request,
  response: any
) => {
  try {
    const payload: any = request?.body;
    const { user_id } = request.query;
    const addExpenseData: any = await ExpenseService.addExpense({
      ...payload,
      user_id,
    });
    setSuccessReponse(addExpenseData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//invokes updateExpense() service
export const editExpenseController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload: any = request?.body;
    const id: string = request.params.id;

    const editExpenseData: any = await ExpenseService.updateExpense(
      payload,
      id
    );
    setSuccessReponse(editExpenseData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//triggers findExpenseById() service
export const findExpenseController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id: string = request.params?.id;
    const getExpenseData: any = await ExpenseService.findExpenseById(id);
    setSuccessReponse(getExpenseData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//invokes deleteExpenseById() service
export const deleteExpenseController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id: string = request.params?.id;
    const { user_id } = request.query;
    const deleteExpenseData: any = await ExpenseService.deleteExpenseById(
      id,
      user_id
    );
    await ExpenseService.deleteExpenseInUser(
      deleteExpenseData._id,
      deleteExpenseData.user_id
    );
    setSuccessReponse(deleteExpenseData, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

//invokes deleteAllExpenses() service
export const deleteAllController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { user_id } = request.query;
    const deleteAllExpenses: any = await ExpenseService.deleteAllExpenses(
      user_id
    );
    setSuccessReponse(deleteAllExpenses, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

//invokes findAllExpenses() service
export const findAllController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const user_id: any = request.query.user_id;
    const { limit, offset } = request.query;
    const findAllExpenses: any = await ExpenseService.findAllExpenses(user_id);
    setSuccessReponse(findAllExpenses, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

//invokes findExpensesBySearchFilters() service
export const findAllBySearchFiltersController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload = request?.body;
    const { limit, offset, user_id } = request.query;
    const getFetchedData: any =
      await ExpenseService.findExpensesBySearchFilters(payload, user_id);
    console.log(getFetchedData);

    setSuccessReponse(getFetchedData, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

export const markExpenseAsDeletedController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload = request.body;
    const { expense_id } = request.query;
    const markAsDeleted: any = await ExpenseService.markExpenseAsDeleted(
      payload,
      expense_id
    );
    setSuccessReponse(markAsDeleted, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

export const getMerchantNamesController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const user_id: any = request.query.user_id;
    const findMerchants = await ExpenseService.findMerchantNamesOfAUser(
      user_id
    );
    setSuccessReponse(findMerchants, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

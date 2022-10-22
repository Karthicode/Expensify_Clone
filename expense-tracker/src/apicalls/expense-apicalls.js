import axios from "axios";
import { SERVER } from "../utilities/utilities";

/** This is giving undefined. resolve it later */
// const SERVER = process.env.REACT_APP_SERVER_HOST;

export const createExpense = async (expenseData, user_id) => {
  try {
    return await axios.post(`${SERVER}/expense`, expenseData, {
      params: {
        //For testing purpose only. replace this id with current user id later
        user_id: user_id,
      },
    });
  } catch (error) {
    return error;
  }
};

export const updateExpense = async (expenseData, expense_id) => {
  try {
    return await axios.put(`${SERVER}/expense/${expense_id}`, expenseData);
  } catch (error) {
    return error;
  }
};

export const deleteExpense = async (expense_id) => {
  try {
    return await axios.delete(`${SERVER}/expense/${expense_id}`);
  } catch (error) {
    return error;
  }
};

export const getExpense = async (expense_id) => {
  try {
    return await axios.get(`${SERVER}/expense/${expense_id}`);
  } catch (error) {
    return new Promise((resolve, reject) => {
      return reject(error.message);
    });
  }
};

export const getAllExpenses = async (user_id) => {
  try {
    return await axios.get(`${SERVER}/expense?user_id=${user_id}`);
  } catch (error) {
    return error;
  }
};

export const markExpenseAsDeleted = async (expenseData, expense_id) => {
  try {
    return await axios.put(
      `${SERVER}/mark-as-delete?expense_id=${expense_id}`,
      expenseData
    );
  } catch (error) {
    return error;
  }
};

export const getExpensesBySearchFilters = async (filters, user_id) => {
  try {
    return await axios.get(`${SERVER}/search?user_id=${user_id}`, {
      data: JSON.stringify(filters),
    });
  } catch (error) {
    return error;
  }
};

export const getMerchantNames = async (user_id) => {
  try {
    return await axios.get(`${SERVER}/merchants?user_id=${user_id}`);
  } catch (error) {
    return error;
  }
};

export const loadCSV = async (__filepath) => {
  try {
    return await axios.get(`${SERVER}/load-csv`, {
      __filepath,
    });
  } catch (error) {
    return error;
  }
};

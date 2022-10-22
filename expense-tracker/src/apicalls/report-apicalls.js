import axios from "axios";
import { SERVER } from "../utilities/utilities";

/** This is giving undefined. resolve it later */
// const SERVER = process.env.REACT_APP_SERVER_HOST;

export const createReport = async (reportData, expense_id, user_id) => {
  try {
    return await axios.post(`${SERVER}/report`, reportData, {
      params: {
        expense_id: expense_id,

        //for testing purpose only, replace with current user id later
        user_id: user_id,
      },
    });
  } catch (error) {
    return error;
  }
};

export const updatedReport = async (reportData, report_id) => {
  try {
    return await axios.put(`${SERVER}/report/${report_id}`, reportData);
  } catch (error) {
    return error;
  }
};

export const getReport = async (report_id) => {
  try {
    return await axios.put(`${SERVER}/report/${report_id}`);
  } catch (error) {
    return error;
  }
};

export const getAllReports = async (user_id) => {
  try {
    return await axios.get(`${SERVER}/report?user_id=${user_id}`);
  } catch (error) {
    return error;
  }
};

export const deleteAllReports = async () => {
  try {
    return await axios.delete(`${SERVER}/report`);
  } catch (error) {
    return error;
  }
};

export const deleteReport = async (report_id) => {
  try {
    return await axios.delete(`${SERVER}/report/${report_id}`);
  } catch (error) {
    return error;
  }
};

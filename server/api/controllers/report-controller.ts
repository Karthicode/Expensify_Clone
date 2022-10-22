import express from "express";
import * as ReportService from "../services/report-service";
import { setErrorReponse, setSuccessReponse } from "../utils/response-util";

//invokes addReport() service
export const addReportController = async (
  request: express.Request,
  response: any
) => {
  try {
    const payload: any = request?.body;
    const { expense_id, user_id } = request.query;
    const addReportData: any = await ReportService.addReport({
      ...payload,
      expense_id,
      user_id,
    });
    setSuccessReponse(addReportData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//invokes updateReport() service
export const editReportController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload: any = request?.body;
    const id: string = request.params.id;

    const editReportData: any = await ReportService.updateReport(payload, id);
    setSuccessReponse(editReportData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//triggers findReportById() service
export const findReportController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id: string = request.params?.id;
    const getReportData: any = await ReportService.findReportById(id);
    setSuccessReponse(getReportData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//invokes deleteReportById() service
export const deleteReportController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id: string = request.params?.id;
    // const { expense_id } = request.query;
    const deletedReport: any = await ReportService.deleteReportById(id);
    await ReportService.deleteReportInExpense(
      deletedReport._id,
      deletedReport.expense_id
    );

    setSuccessReponse(deletedReport, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

//invokes deleteAllReports() service
export const deleteAllController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { expense_id } = request.query;
    const deleteAllReports: any = await ReportService.deleteAllReports(
      expense_id
    );
    setSuccessReponse(deleteAllReports, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

//invokes findAllReports() service
export const findAllController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const user_id: any = request.query.user_id;
    const findAllReports: any = await ReportService.findAllReports(user_id);
    setSuccessReponse(findAllReports, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

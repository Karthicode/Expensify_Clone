import express from "express";
import * as UserService from "../services/user-service";
import { setErrorReponse, setSuccessReponse } from "../utils/response-util";

//invokes addUser() service
export const addUserController = async (
  request: express.Request,
  response: any
) => {
  try {
    const payload: any = request?.body;
    const addUserData: any = await UserService.addUser(payload);
    console.log(addUserData);
    setSuccessReponse(addUserData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//invokes updateUser() service
export const editUserController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload: any = request?.body;
    const id: string = request.params.id;

    const editUserData: any = await UserService.updateUser(payload, id);
    setSuccessReponse(editUserData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//triggers findUserById() service
export const findUserController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id: string = request.params?.id;
    const getUserData: any = await UserService.findUserById(id);
    setSuccessReponse(getUserData, response);
  } catch (error: any) {
    setErrorReponse(error, response);
  }
};

//invokes deleteUserById() service
export const deleteUserController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const id: string = request.params?.id;
    const deleteUserData: any = await UserService.deleteUserById(id);
    setSuccessReponse(deleteUserData, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

//invokes deleteAllUsers() service
export const deleteAllController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const deleteAllUsers: any = await UserService.deleteAllUsers();
    setSuccessReponse(deleteAllUsers, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

//invokes findAllUsers() service
export const findAllController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const findAllUsers: any = await UserService.findAllUsers();
    setSuccessReponse(findAllUsers, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

export const groupedUserDataController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { email } = request.query;
    const groupedUserData: any = await UserService.findUserData(email);
    setSuccessReponse(groupedUserData, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

export const getDashboardDataController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { user_id, expense_id } = request.query;
    const groupedUserData: any = await UserService.getDashboardData(
      user_id,
      expense_id
    );
    setSuccessReponse(groupedUserData, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};

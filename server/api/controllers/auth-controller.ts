import { setErrorReponse, setSuccessReponse } from "../utils/response-util";
import express from "express";
import "dotenv/config";
import * as AuthService from "../services/auth-service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//handles new User registration
export const newUserController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload = request?.body;
    const newUser: any = await AuthService.registerNewUser(payload);
    setSuccessReponse(newUser, response);
  } catch (error) {
    setErrorReponse(error, response);
  }
};
//handles login authentication of existing user details
export const handleLoginController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload = request?.body;
    const user: any = await AuthService.findUserAndAuthenticate(payload);
    const matched = await bcrypt.compare(payload.password, user.password);

    if (matched === true) {
      jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        },
        function (err, accessToken) {
          if (err) {
            return err;
          } else {
            return accessToken;
          }
        }
      );
    } else {
      return {
        error: "Wrong credentials",
      };
    }
  } catch (error) {
    setErrorReponse(error, response);
  }
};
//controller to send an email to reset password based on email
export const forgotPasswordController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload = request.body;
    const forgotPassword: any = AuthService.forgotPasswordService(payload);
    setSuccessReponse(forgotPassword, response);
  } catch (error) {
    console.log(error);
    setErrorReponse(error, response);
  }
};

export const resetPasswordController = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const payload = request.body;
    const resetPassword: any = await AuthService.resetUserPassword(payload);
    setSuccessReponse(resetPassword, response);
  } catch (error) {
    console.log(error);
    setErrorReponse(error, response);
  }
};

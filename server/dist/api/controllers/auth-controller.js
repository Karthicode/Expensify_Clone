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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = exports.handleLoginController = exports.newUserController = void 0;
const response_util_1 = require("../utils/response-util");
require("dotenv/config");
const AuthService = __importStar(require("../services/auth-service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//handles new User registration 
const newUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const newUser = yield AuthService.registerNewUser(payload);
        (0, response_util_1.setSuccessReponse)(newUser, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.newUserController = newUserController;
//handles login authentication of existing user details
const handleLoginController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const user = yield AuthService.findUserAndAuthenticate(payload);
        const matched = yield bcrypt_1.default.compare(payload.password, user.password);
        if (matched == true) {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign({ id: user._id,
                    email: user.email
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                }, function (err, accessToken) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(accessToken);
                        (0, response_util_1.setSuccessReponse)({ accessToken }, response);
                    }
                });
            });
        }
        else {
            return {
                error: "Wrong credentials",
            };
        }
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.handleLoginController = handleLoginController;
//controller to send an email to reset password based on email
const forgotPasswordController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request.body;
        const forgotPassword = AuthService.forgotPasswordService(payload);
        (0, response_util_1.setSuccessReponse)(forgotPassword, response);
    }
    catch (error) {
        console.log(error);
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.forgotPasswordController = forgotPasswordController;
const resetPasswordController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request.body;
        const resetPassword = yield AuthService.resetUserPassword(payload);
        (0, response_util_1.setSuccessReponse)(resetPassword, response);
    }
    catch (error) {
        console.log(error);
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.resetPasswordController = resetPasswordController;

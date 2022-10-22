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
exports.getDashboardDataController = exports.groupedUserDataController = exports.findAllController = exports.deleteAllController = exports.deleteUserController = exports.findUserController = exports.editUserController = exports.addUserController = void 0;
const UserService = __importStar(require("../services/user-service"));
const response_util_1 = require("../utils/response-util");
//invokes addUser() service
const addUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const addUserData = yield UserService.addUser(payload);
        console.log(addUserData);
        (0, response_util_1.setSuccessReponse)(addUserData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.addUserController = addUserController;
//invokes updateUser() service
const editUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request === null || request === void 0 ? void 0 : request.body;
        const id = request.params.id;
        const editUserData = yield UserService.updateUser(payload, id);
        (0, response_util_1.setSuccessReponse)(editUserData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.editUserController = editUserController;
//triggers findUserById() service
const findUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id;
        const getUserData = yield UserService.findUserById(id);
        (0, response_util_1.setSuccessReponse)(getUserData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.findUserController = findUserController;
//invokes deleteUserById() service
const deleteUserController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = request.params) === null || _b === void 0 ? void 0 : _b.id;
        const deleteUserData = yield UserService.deleteUserById(id);
        (0, response_util_1.setSuccessReponse)(deleteUserData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.deleteUserController = deleteUserController;
//invokes deleteAllUsers() service
const deleteAllController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAllUsers = yield UserService.deleteAllUsers();
        (0, response_util_1.setSuccessReponse)(deleteAllUsers, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.deleteAllController = deleteAllController;
//invokes findAllUsers() service
const findAllController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUsers = yield UserService.findAllUsers();
        (0, response_util_1.setSuccessReponse)(findAllUsers, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.findAllController = findAllController;
const groupedUserDataController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.query;
        const groupedUserData = yield UserService.findUserData(email);
        (0, response_util_1.setSuccessReponse)(groupedUserData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.groupedUserDataController = groupedUserDataController;
const getDashboardDataController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, expense_id } = request.query;
        const groupedUserData = yield UserService.getDashboardData(user_id, expense_id);
        (0, response_util_1.setSuccessReponse)(groupedUserData, response);
    }
    catch (error) {
        (0, response_util_1.setErrorReponse)(error, response);
    }
});
exports.getDashboardDataController = getDashboardDataController;

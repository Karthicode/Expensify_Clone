"use strict";
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
exports.resetUserPassword = exports.forgotPasswordService = exports.findUserAndAuthenticate = exports.registerNewUser = void 0;
const index_1 = require("../models/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const mailer_service_1 = require("./mailer-service");
const registerNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = data;
        if (password.length < 5) {
            return {
                error: 'Password too small. Should be atleast 6 characters',
            };
        }
        const passwordHashed = yield bcrypt_1.default.hash(password, 10);
        index_1.User.create({
            email,
            password: passwordHashed
        }).then((newUser) => {
            if (newUser) {
                return newUser;
            }
            else {
                return {
                    message: "Error creating new user",
                };
            }
        });
    }
    catch (error) {
        return {
            error: "Cannot create new user",
        };
    }
});
exports.registerNewUser = registerNewUser;
const findUserAndAuthenticate = (data) => {
    const { email } = data;
    console.log(data);
    return index_1.User.findOne({ email }).exec()
        .then((user) => {
        if (!user) {
            return {
                error: "User not found",
            };
        }
        else {
            return user;
        }
    }).catch((error) => {
        return {
            error: "Cannot find"
        };
    });
};
exports.findUserAndAuthenticate = findUserAndAuthenticate;
const forgotPasswordService = (emailID) => {
    const { email } = emailID;
    index_1.User.findOne({ email }).exec()
        .then((user) => {
        if (!user) {
            return { error: "User with this email does not exist" };
        }
        else {
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.RESET_PWD_KEY, { expiresIn: '15m' });
            const data = {
                from: 'noreply@reset.com',
                to: email,
                subject: 'Password Reset Link',
                html: `<h2> Please click on the given link to reset your password. This link expires in 15 mins!</h2>
                 <a href = "${process.env.CLIENT_URL}/resetPassword/${token}">Reset your password here</a>`
            };
            index_1.User.updateOne({ resetLink: token }, function (err, updated) {
                if (err) {
                    return { error: "Error updating reset Link in DB", };
                }
                else {
                    (0, mailer_service_1.sendEmailService)({ options: data }).then((message) => {
                        return message;
                    });
                }
            });
        }
    }).catch((error) => {
        console.log(error.message);
    });
};
exports.forgotPasswordService = forgotPasswordService;
const resetUserPassword = (data) => {
    const { resetLink, newPassword } = data;
    if (resetLink) {
        jsonwebtoken_1.default.verify(resetLink, process.env.RESET_PWD_KEY, function (err, decodedData) {
            console.log(decodedData);
            if (err) {
                return { error: "email does not exist" };
            }
            index_1.User.findOne({ resetLink }, (error, user) => __awaiter(this, void 0, void 0, function* () {
                if (error || !user) {
                    return { error: "user does not exist with this data" };
                }
                if (newPassword.length < 5) {
                    return {
                        error: 'Password too small. Should be atleast 6 characters'
                    };
                }
                const passwordHashed = yield bcrypt_1.default.hash(newPassword, 10);
                const newObj = {
                    password: passwordHashed,
                    resetLink: ''
                };
                const userObj = Object.assign(user, newObj);
                userObj.save();
                console.log("success");
                return { message: "Password changed" };
            }));
        });
    }
    else {
        return { error: "Error decoding data" };
    }
};
exports.resetUserPassword = resetUserPassword;

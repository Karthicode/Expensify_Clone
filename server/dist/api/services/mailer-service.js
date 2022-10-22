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
exports.sendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * @param {*} options
 * @returns {Promise<void>}
 */
const sendEmailService = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(options);
        const data = options;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply.expensify@gmail.com',
                pass: 'Quasi_250'
            }
        });
        const mailOptions = {
            from: 'noreply.expensify@gmail.com',
            to: data.options.to,
            subject: data.options.subject,
            html: data.options.html
        };
        console.log("MAILOPTIONs", mailOptions);
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
                return Promise.reject("Error in sending email");
            }
            else {
                console.log("Email sent successfully");
                console.log(data);
                return Promise.resolve("Email sent");
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmailService = sendEmailService;

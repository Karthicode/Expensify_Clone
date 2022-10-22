"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./api/app"));
require("dotenv").config();
const port = process.env.PORT;
app_1.default.listen(port, () => console.log(`backend server listening on port ${port}`));

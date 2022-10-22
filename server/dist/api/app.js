"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = __importDefault(require("./routes/index.js"));
/* Creating an Express application using express() function
which is a top-level function exported by the express module. */
const app = (0, express_1.default)();
/* using mongoose's default method to connect to the database */
mongoose_1.default.connect("mongodb://localhost:27017/expensify");
/* Setting up Express middlewares that
execute during the lifecycle of a request to the Express server. */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)());
// {credentials: true, origin: 'http://localhost:3001'}
//check for all available routes and redirect to the relavant route.
(0, index_js_1.default)(app);
//exporting the app variable which holds the express() function
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes"));
// exports default as a function with express() as argument
exports.default = (app) => {
    //sets itemRouter component to search for all routes
    app.use("/", routes_1.default);
    app.get("*", function (req, res) {
        res.status(404).send({ message: "404 : Not Found" });
    });
};

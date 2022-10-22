"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
//creates a schema and defines the accepted data
const ReportSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Report name is required"],
    },
    report: {
        type: String,
        required: [true, "report must be attached"],
        immutable: true,
    },
    /* Association with expense Schema */
    expense_id: {
        type: mongoose_2.default.SchemaTypes.ObjectId,
        ref: "Expense",
        required: [true, "inavlid expense_id"],
        immutable: true,
    },
    user_id: {
        type: mongoose_2.default.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "invalid user_id"],
        immutable: true,
    },
}, {
    timestamps: true,
});
//creates a model with the specified collection name and schema.
const model = mongoose_2.default.model("report", ReportSchema);
exports.default = model;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
//creates a schema and defines the accepted data
const ExpenseSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    merchant: {
        type: String,
        required: [true, "Merchant is required"],
    },
    category: {
        type: String,
    },
    reimbursable: {
        type: Boolean,
        immutable: true,
        default: false,
    },
    total: {
        type: Number,
        required: [true, "Total amt is required"],
    },
    currency: {
        type: String,
        default: "USD",
    },
    description: {
        type: String,
    },
    reports: [
        {
            type: mongoose_2.default.SchemaTypes.ObjectId,
            ref: "Report",
            immutable: true,
        },
    ],
    open: {
        type: Boolean,
        default: false,
    },
    processing: {
        type: Boolean,
        default: false,
    },
    reimbursed: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    /* Association with User Schema */
    user_id: {
        type: mongoose_2.default.SchemaTypes.ObjectId,
        required: [
            true,
            "cannot create an expense without user. Create a user first or attach this expense to an existing user",
        ],
        immutable: true,
    },
    receipt: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
//creates a model with the specified collection name and schema.
const model = mongoose_2.default.model("expense", ExpenseSchema);
exports.default = model;

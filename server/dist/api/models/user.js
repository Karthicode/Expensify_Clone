"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//creates a schema and defines the accepted data
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetLink: {
        data: String,
        default: ''
    },
    expenses: [
        {
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Expense",
            immutable: true,
        },
    ],
    /* allows excluding paths from versioning
      (i.e., the internal revision will not be incremented even
      if these paths are updated) */
}, {
    timestamps: true,
});
//creates a model with the specified collection name and schema.
const model = mongoose_1.default.model("user", UserSchema);
exports.default = model;

import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import Expense from "../models/expense";

interface UserI extends Document {
  email: string;
  password: string;
  resetLink: String;
  expenses: Array<typeof Expense>;
}

//creates a schema and defines the accepted data
const UserSchema = new mongoose.Schema<UserI>(
  {
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Expense",
        immutable: true,
      },
    ],

    /* allows excluding paths from versioning 
      (i.e., the internal revision will not be incremented even 
      if these paths are updated) */
  },
  {
    timestamps: true,
  }
);

//creates a model with the specified collection name and schema.
const model = mongoose.model("user", UserSchema);

export default model;

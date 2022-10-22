import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

interface ReportI extends Document {
  name: string;
  expense_id: string;
  user_id: string;
  report: string;
}

//creates a schema and defines the accepted data
const ReportSchema = new Schema<ReportI>(
  {
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Expense",
      required: [true, "inavlid expense_id"],
      immutable: true,
    },

    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "invalid user_id"],
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

//creates a model with the specified collection name and schema.
const model = mongoose.model("report", ReportSchema);

export default model;

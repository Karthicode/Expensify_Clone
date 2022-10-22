import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

interface ExpenseI extends Document {
  date: Date;
  merchant: string;
  category?: string;
  reimbursable: boolean;
  total: number;
  currency?: string;
  description?: boolean;
  reports?: [];
  open?: boolean;
  processing?: boolean;
  reimbursed?: boolean;
  deleted?: boolean;
  user_id: string;
  receipt?: string;
}

//creates a schema and defines the accepted data
const ExpenseSchema = new Schema<ExpenseI>(
  {
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
        type: mongoose.SchemaTypes.ObjectId,
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
      type: mongoose.SchemaTypes.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

//creates a model with the specified collection name and schema.
const model = mongoose.model("expense", ExpenseSchema);

export default model;

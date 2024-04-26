import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    priority: {
      type: Boolean,
      default: false,
    },
    flag: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);

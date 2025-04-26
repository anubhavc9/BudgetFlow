import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoalSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

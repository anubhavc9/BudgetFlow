import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const GoalSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    spent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

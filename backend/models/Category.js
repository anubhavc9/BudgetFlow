import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CategorySchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  color: { type: String, required: true },
});

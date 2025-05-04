import mongoose from "mongoose";
import { CategorySchema } from "../models/Category.js";

const Category = mongoose.model("Category", CategorySchema);

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

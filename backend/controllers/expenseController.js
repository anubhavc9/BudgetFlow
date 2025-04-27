import mongoose from "mongoose";
import { ExpenseSchema } from "../models/Expense.js";

const Expense = mongoose.model("Expense", ExpenseSchema);

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};

export const addExpense = async (req, res) => {
  const { category, amount, description } = req.body;
  const newExpense = new Expense({ category, amount, description });
  await newExpense.save();
  res.json(newExpense);
};

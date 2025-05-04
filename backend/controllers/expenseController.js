import mongoose from "mongoose";
import { ExpenseSchema } from "../models/Expense.js";

const Expense = mongoose.model("Expense", ExpenseSchema);

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
};

export const addExpense = async (req, res) => {
  const { category, amount, description, date } = req.body;
  const newExpense = new Expense({
    category,
    amount,
    description,
    date,
    user: req.user._id,
  });
  await newExpense.save();
  res.json(newExpense);
};

import mongoose from "mongoose";
import { GoalSchema } from "../models/Goal.js";

const Goal = mongoose.model("Goal", GoalSchema);

export const createGoal = async (req, res) => {
  try {
    const { category, targetAmount, month } = req.body;
    const newGoal = new Goal({ category, targetAmount, month });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const { month } = req.query;
    const query = month ? { month } : {};
    const goals = await Goal.find(query);
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    await Goal.findByIdAndDelete(id);
    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

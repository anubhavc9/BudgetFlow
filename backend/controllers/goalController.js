import mongoose from "mongoose";
import { GoalSchema } from "../models/Goal.js";

const Goal = mongoose.model("Goal", GoalSchema);

export const createGoal = async (req, res) => {
  try {
    const { category, limit, spent } = req.body;
    const newGoal = new Goal({ category, limit, spent, user: req.user._id });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const getGoals = async (req, res) => {
//   try {
//     const goals = await Goal.find({ user: req.user._id });
//     res.json(goals);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getGoals = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const goalsWithSpent = await Goal.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: "expenses",
          let: { goalCategory: "$category", goalUser: "$user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$category", "$$goalCategory"] },
                    { $eq: ["$user", "$$goalUser"] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: null,
                totalSpent: { $sum: "$amount" },
              },
            },
          ],
          as: "spentData",
        },
      },
      {
        $addFields: {
          spent: {
            $ifNull: [{ $arrayElemAt: ["$spentData.totalSpent", 0] }, 0],
          },
        },
      },
      {
        $project: {
          spentData: 0,
        },
      },
    ]);

    res.json(goalsWithSpent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!goal) {
      return res
        .status(404)
        .json({ message: "Goal not found or unauthorized" });
    }

    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOneAndDelete({ _id: id, user: req.user._id });

    if (!goal) {
      return res
        .status(404)
        .json({ message: "Goal not found or unauthorized" });
    }

    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import React from "react";
import { Progress } from "@/components/ui/progress";

const BudgetTracker = () => {
  const goals = [
    { category: "Entertainment", spent: 30.5, limit: 150 },
    { category: "Utilities", spent: 120, limit: 200 },
    { category: "Shopping", spent: 134.29, limit: 250 },
    { category: "Other", spent: 20, limit: 50 },
  ];

  return (
    <div className="space-y-4">
      {goals.map((goal, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span>{goal.category}</span>
            <span>
              ₹{goal.spent.toFixed(2)} / ₹{goal.limit.toFixed(2)}
            </span>
          </div>
          <Progress
            value={(goal.spent / goal.limit) * 100}
            className="mt-2 [&>*]:bg-indigo-600 bg-gray-300 rounded-full"
          />
        </div>
      ))}
    </div>
  );
};

export default BudgetTracker;

import React from "react";

const BudgetTracker = () => {
  const goals = [
    { category: "Entertainment", spent: 30.5, limit: 150 },
    { category: "Utilities", spent: 120, limit: 200 },
    { category: "Shopping", spent: 134.29, limit: 250 },
    { category: "Other", spent: 20, limit: 50 },
  ];

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Budget Goals</h2>
      {goals.map((goal, index) => (
        <div key={index} className="mb-2">
          <div className="flex justify-between text-sm">
            <span>{goal.category}</span>
            <span>
              ${goal.spent.toFixed(2)} / ${goal.limit.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${(goal.spent / goal.limit) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetTracker;

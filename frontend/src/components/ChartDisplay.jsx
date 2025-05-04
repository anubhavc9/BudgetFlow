import Utility from "@/utils/Utility";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ChartDisplay = ({ data, categories }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const getCategoryLabel = (categoryId) => {
    return (
      categories?.find((cat) => cat._id === categoryId)?.label ||
      "Uncategorized"
    );
  };

  const getCategoryColor = (categoryId) => {
    return (
      categories?.find((cat) => cat._id === categoryId)?.color || "#cccccc"
    );
  };

  // Add categoryLabel to each item for use in Pie's nameKey
  const transformedData = data.map((item) => ({
    ...item,
    categoryLabel: getCategoryLabel(item.category),
  }));

  return (
    <div className="flex flex-col items-center">
      <PieChart width={400} height={400}>
        <Pie
          data={transformedData}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="amount"
          // nameKey="category"
          // label={({ name, value }) => `${Utility.formatCurrency(value)}`}
          nameKey="categoryLabel"
          label={({ name, value }) => `${Utility.formatCurrency(value)}`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getCategoryColor(entry.category)}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => Utility.formatCurrency(value)} />
        <Legend />
      </PieChart>
      <p className="text-lg font-bold text-gray-800 mt-4">
        Total: {Utility.formatCurrency(total)}
      </p>
    </div>
  );
};

export default ChartDisplay;

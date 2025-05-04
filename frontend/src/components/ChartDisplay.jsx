import Utility from "@/utils/Utility";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ChartDisplay = ({ data, categories }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const getCategoryColor = (categoryId) => {
    return (
      categories?.find((cat) => cat._id === categoryId)?.color || "#cccccc"
    );
  };

  // Add categoryLabel to each item for use in Pie's nameKey
  const transformedData = data.map((item) => ({
    ...item,
    categoryLabel: Utility.getCategoryLabel(categories, item.category),
  }));

  return (
    <div className="flex flex-col items-center">
      <PieChart width={500} height={500}>
        <Pie
          data={transformedData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={120}
          fill="#8884d8"
          dataKey="amount"
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
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
      <p className="text-lg font-bold text-gray-800 mt-4">
        Total: {Utility.formatCurrency(total)}
      </p>
    </div>
  );
};

export default ChartDisplay;

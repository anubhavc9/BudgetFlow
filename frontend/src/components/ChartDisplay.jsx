import { categories } from "@/lib/categories";
import Utility from "@/utils/Utility";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ChartDisplay = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const categoryColorMap = categories.reduce((map, category) => {
    map[category.value] = category.color;
    return map;
  }, {});

  return (
    <div className="flex flex-col items-center">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="amount"
          nameKey="category"
          label={({ name, value }) => `${Utility.formatCurrency(value)}`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={categoryColorMap[entry.category] || "#cccccc"}
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

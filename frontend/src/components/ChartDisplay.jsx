import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

const ChartDisplay = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

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
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <p className="text-lg font-bold text-gray-800 mt-4">
        Total: ${total.toFixed(2)}
      </p>
    </div>
  );
};

export default ChartDisplay;

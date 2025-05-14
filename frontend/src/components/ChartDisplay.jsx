import Utility from "@/utils/Utility";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { BarChart3 } from "lucide-react";

const ChartDisplay = ({ data, categories }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] w-full text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6">
        <BarChart3 className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700">
          No data to display
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Your expense chart will appear here once you start adding expenses.
        </p>
      </div>
    );
  }

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
              fill={Utility.getCategoryColor(categories, entry.category)}
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

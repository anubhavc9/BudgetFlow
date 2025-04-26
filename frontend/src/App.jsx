import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDisplay from "./components/ChartDisplay";
import ExpenseForm from "./components/ExpenseForm";
import BudgetTracker from "./components/BudgetTracker";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddExpense = (newExpense) => {
    axios
      .post("http://localhost:1234/api/expenses", newExpense)
      .then((res) => setExpenses((prev) => [...prev, res.data]))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">BudgetFlow Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <ChartDisplay data={expenses} />
        </div>
        <div>
          <BudgetTracker />
        </div>
      </div>
      <div className="mt-6">
        <ExpenseForm onAdd={handleAddExpense} />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${expense.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

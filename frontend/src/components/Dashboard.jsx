import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ChartDisplay from "./ChartDisplay";
import ExpenseForm from "./ExpenseForm";
import BudgetTracker from "./BudgetTracker";
import RecentExpenses from "./RecentExpenses";
import axios from "axios";

export default function Dashboard() {
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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        BudgetFlow Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="text-center">
            <CardTitle>Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartDisplay data={expenses} />
          </CardContent>
        </Card>
        <BudgetTracker />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm onAdd={handleAddExpense} />
        </CardContent>
      </Card>
      <RecentExpenses expenses={expenses} />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDisplay from "./components/ChartDisplay";
import ExpenseForm from "./components/ExpenseForm";

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
    <div>
      <h1>BudgetFlow</h1>
      <ExpenseForm onAdd={handleAddExpense} />
      <ChartDisplay data={expenses} />
    </div>
  );
}

export default App;

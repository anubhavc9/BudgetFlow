import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDisplay from "./components/ChartDisplay";
import ExpenseForm from "./components/ExpenseForm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExpenseForm = ({ onAdd }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ category, amount: parseFloat(amount), description, date });
    setCategory("");
    setAmount("");
    setDescription("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-md"
      />
      <Select onValueChange={(value) => setCategory(value)} required>
        <SelectTrigger className="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-md">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-md rounded">
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Utilities">Utilities</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-md"
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-md"
      />
      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
      >
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseForm;

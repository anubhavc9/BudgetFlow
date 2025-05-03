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
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { categories } from "@/lib/categories";

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
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-md"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal w-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="[&_[aria-selected=true]]:bg-indigo-600 [&_[aria-selected=true]]:text-white [&_[aria-selected=true]]:hover:bg-indigo-700 [&_button:hover]:bg-indigo-100"
          />
        </PopoverContent>
      </Popover>

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

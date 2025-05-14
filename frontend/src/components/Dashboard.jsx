import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ChartDisplay from "./ChartDisplay";
import ExpenseForm from "./ExpenseForm";
import BudgetTracker from "./BudgetTracker";
import RecentExpenses from "./RecentExpenses";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import { API_BASE_URL } from "../../config/api.js";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingExpenses(true);
    const token = localStorage.getItem("token");
    axios
      .get(`${API_BASE_URL}/api/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setExpenses(res.data);
        setLoadingExpenses(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingExpenses(false);
      });
  }, []);

  useEffect(() => {
    setLoadingCategories(true);
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
        setLoadingCategories(false);
      });
  }, []);

  const handleAddExpense = (newExpense) => {
    const token = localStorage.getItem("token");
    axios
      .post(`${API_BASE_URL}/api/expenses`, newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setExpenses((prev) => [...prev, res.data]))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <img src="/icons/logo.svg" alt="Logo" className="w-14 h-14" />
          <h1 className="text-3xl font-bold text-gray-800">BudgetFlow</h1>
        </div>
        <div className="flex items-center space-x-2">
          <LogoutButton className="text-sm sm:text-base p-2 sm:p-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingExpenses ? (
          <Skeleton className="w-full h-[630px] rounded-xl bg-gray-200 col-span-1 lg:col-span-2" />
        ) : (
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="text-center">
              <CardTitle>Spending Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartDisplay
                data={expenses}
                categories={categories}
                loading={loadingExpenses}
              />
            </CardContent>
          </Card>
        )}

        <BudgetTracker categories={categories} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm onAdd={handleAddExpense} categories={categories} />
        </CardContent>
      </Card>
      <RecentExpenses
        expenses={expenses}
        categories={categories}
        loadingExpenses={loadingExpenses}
        loadingCategories={loadingCategories}
      />
    </div>
  );
}

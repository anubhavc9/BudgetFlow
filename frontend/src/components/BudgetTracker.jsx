import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Utility from "@/utils/Utility";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { API_BASE_URL } from "../../config/api.js";
import { Wallet } from "lucide-react";

const BudgetTracker = ({ categories }) => {
  const [goals, setGoals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingGoal, setAddingGoal] = useState(false);

  const fetchGoals = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(`${API_BASE_URL}/api/goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGoals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!selectedCategory || !limit) return;

    const token = localStorage.getItem("token");
    setAddingGoal(true);

    try {
      await axios.post(
        `${API_BASE_URL}/api/goals`,
        {
          category: selectedCategory,
          limit: parseFloat(limit),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedCategory("");
      setLimit("");
      fetchGoals();
    } catch (err) {
      console.error("Error adding goal:", err);
    } finally {
      setAddingGoal(false);
    }
  };

  return (
    <Card>
      {loading ? (
        <CardContent className="p-6 space-y-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="w-full h-6 bg-gray-200" />
              <Skeleton className="w-full h-4 rounded-full bg-gray-200" />
            </div>
          ))}
        </CardContent>
      ) : goals.length === 0 ? (
        <CardContent className="flex flex-col items-center justify-center h-60 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 m-6">
          <Wallet className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">
            No budget goals added yet
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Start by setting your budget goals to track your spending.
          </p>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Budget Goals</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                  <div className="flex gap-1 items-center">
                    <img
                      src={Utility.getCategoryIconSrc(
                        categories,
                        goal.category
                      )}
                      alt=""
                      className="w-6 h-6"
                    />
                    <span>
                      {Utility.getCategoryLabel(categories, goal.category)}
                    </span>
                  </div>
                  <span>
                    {Utility.formatCurrency(goal.spent)} /{" "}
                    {Utility.formatCurrency(goal.limit)}
                  </span>
                </div>
                <Progress
                  value={(goal.spent / goal.limit) * 100}
                  className="mt-2 [&>*]:bg-indigo-600 bg-gray-300 rounded-full"
                />
              </div>
            ))}
          </CardContent>
        </>
      )}

      <CardHeader>
        <CardTitle>Add Budget Goal</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md rounded cursor-pointer">
            {categories.map((cat) => (
              <SelectItem
                key={cat._id}
                value={cat._id}
                className="cursor-pointer"
              >
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Enter Limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <Button
          onClick={handleAddGoal}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          disabled={addingGoal}
        >
          {addingGoal ? "Adding..." : "Add Goal"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;

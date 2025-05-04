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

const BudgetTracker = ({ categories }) => {
  const [goals, setGoals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limit, setLimit] = useState("");

  const fetchGoals = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:1234/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setGoals(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!selectedCategory || !limit) return;

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:1234/api/goals",
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
    }
  };

  return (
    <>
      <Card className="">
        {goals.length > 0 && (
          <>
            <CardHeader>
              <CardTitle>Budget Goals</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
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
              </div>
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
          >
            Add Goal
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default BudgetTracker;

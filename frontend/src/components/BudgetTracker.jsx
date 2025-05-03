import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Utility from "@/utils/Utility";

const BudgetTracker = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:1234/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setGoals(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {goals.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Budget Goals</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>{goal.category}</span>
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
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default BudgetTracker;

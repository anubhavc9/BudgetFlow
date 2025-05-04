import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Utility from "@/utils/Utility";
import { format } from "date-fns";

function RecentExpenses({ expenses, categories }) {
  const getCategoryLabel = (categoryId) => {
    return (
      categories?.find((cat) => cat._id === categoryId)?.label ||
      "Uncategorized"
    );
  };

  const getCategoryIconSrc = (categoryId) => {
    const categoryLabel = getCategoryLabel(categoryId);
    return `/icons/${categoryLabel.toLowerCase()}.svg`;
  };

  const getCategoryColor = (categoryId) => {
    return (
      categories?.find((cat) => cat._id === categoryId)?.color || "#cccccc"
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="text-left">Date</TableCell>
              <TableCell className="text-left">Category</TableCell>
              <TableCell className="text-left">Description</TableCell>
              <TableCell className="text-right">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">
                  {format(new Date(expense.date), "do LLL, yyyy")}
                </TableCell>
                <TableCell className="text-left">
                  <span
                    className="flex items-center gap-1 px-2 py-1 rounded-full border w-fit text-xs"
                    style={{
                      borderColor: getCategoryColor(expense.category),
                      color: getCategoryColor(expense.category),
                    }}
                  >
                    <img
                      src={getCategoryIconSrc(expense.category)}
                      alt=""
                      className="w-5 h-5"
                    />
                    {getCategoryLabel(expense.category)}
                  </span>
                </TableCell>
                <TableCell className="text-left">
                  {expense.description || "-"}
                </TableCell>
                <TableCell className="text-right">
                  {Utility.formatCurrency(expense.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentExpenses;

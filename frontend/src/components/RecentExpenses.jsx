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
  const getCategoryIconSrc = (categoryId) => {
    const categoryLabel = Utility.getCategoryLabel(categories, categoryId);
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
                  {/* Large screen: Full chip with icon + label */}
                  <span
                    className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full border w-fit text-xs"
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
                    {Utility.getCategoryLabel(categories, expense.category)}
                  </span>

                  {/* Small screen: Icon only with tooltip */}
                  <div className="relative sm:hidden group w-fit">
                    <div
                      className="p-1 rounded-full border"
                      style={{
                        borderColor: getCategoryColor(expense.category),
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={getCategoryIconSrc(expense.category)}
                        alt=""
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="absolute z-10 bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {Utility.getCategoryLabel(categories, expense.category)}
                    </div>
                  </div>
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

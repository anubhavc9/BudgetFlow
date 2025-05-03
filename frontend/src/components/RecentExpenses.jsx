import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Utility from "@/utils/Utility";
import { format } from "date-fns";

function RecentExpenses({ expenses }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-left">Date</TableCell>
              <TableCell className="text-left">Category</TableCell>
              <TableCell className="text-left">Description</TableCell>
              <TableCell className="text-right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">
                  {format(new Date(expense.date), "do LLL, yyyy")}{" "}
                </TableCell>
                <TableCell className="text-left">
                  {expense.category ? expense.category : "Uncategorized"}
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

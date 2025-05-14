import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Utility from "@/utils/Utility";
import { format } from "date-fns";
import { ReceiptText } from "lucide-react";

function RecentExpenses({
  expenses,
  categories,
  loadingExpenses,
  loadingCategories,
}) {
  const isLoading = loadingExpenses || loadingCategories;
  const isEmpty = !isLoading && expenses.length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-60 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6">
            <ReceiptText className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">
              No expenses added yet
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Start tracking your spending by adding a new expense.
            </p>
          </div>
        ) : (
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
              {isLoading
                ? [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-left">
                        <Skeleton className="w-24 h-4 bg-gray-200" />
                      </TableCell>
                      <TableCell className="text-left">
                        <Skeleton className="w-32 h-6 rounded-full bg-gray-200" />
                      </TableCell>
                      <TableCell className="text-left">
                        <Skeleton className="w-48 h-4 bg-gray-200" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="w-16 h-4 ml-auto bg-gray-200" />
                      </TableCell>
                    </TableRow>
                  ))
                : expenses.map((expense, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-left">
                        {format(new Date(expense.date), "do LLL, yyyy")}
                      </TableCell>
                      <TableCell className="text-left">
                        {/* Large screen: Full chip with icon + label */}
                        <span
                          className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full border w-fit text-xs"
                          style={{
                            borderColor: Utility.getCategoryColor(
                              categories,
                              expense.category
                            ),
                            color: Utility.getCategoryColor(
                              categories,
                              expense.category
                            ),
                          }}
                        >
                          <img
                            src={Utility.getCategoryIconSrc(
                              categories,
                              expense.category
                            )}
                            alt=""
                            className="w-5 h-5"
                          />
                          {Utility.getCategoryLabel(
                            categories,
                            expense.category
                          )}
                        </span>

                        {/* Small screen: Icon only with tooltip */}
                        <div className="relative sm:hidden group w-fit">
                          <div
                            className="p-1 rounded-full border"
                            style={{
                              borderColor: Utility.getCategoryColor(
                                categories,
                                expense.category
                              ),
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={Utility.getCategoryIconSrc(
                                categories,
                                expense.category
                              )}
                              alt=""
                              className="w-5 h-5"
                            />
                          </div>
                          <div className="absolute z-10 bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {Utility.getCategoryLabel(
                              categories,
                              expense.category
                            )}
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
        )}
      </CardContent>
    </Card>
  );
}

export default RecentExpenses;

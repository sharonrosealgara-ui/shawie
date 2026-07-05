"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Repeat } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import { ExpenseDialog, type ExpenseFormValues } from "@/components/expenses/expense-dialog";
import { useExpenseStore } from "@/store/expense-store";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Expense } from "@/types";

type SortKey = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

export default function ExpenseTrackerPage() {
  const expenses = useExpenseStore((s) => s.expenses);
  const addExpense = useExpenseStore((s) => s.addExpense);
  const updateExpense = useExpenseStore((s) => s.updateExpense);
  const removeExpense = useExpenseStore((s) => s.removeExpense);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date-desc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);

  const categories = useMemo(() => Array.from(new Set(expenses.map((e) => e.category))), [expenses]);

  const filtered = useMemo(() => {
    let result = expenses.filter((e) => e.description.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter !== "all") result = result.filter((e) => e.category === categoryFilter);

    result = [...result].sort((a, b) => {
      switch (sortKey) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
      }
    });
    return result;
  }, [expenses, search, categoryFilter, sortKey]);

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  function handleSubmit(values: ExpenseFormValues) {
    if (editing) {
      updateExpense(editing.id, values);
      toast.success("Expense updated");
    } else {
      addExpense(values);
      toast.success("Expense added");
    }
  }

  return (
    <div>
      <PageHeader
        title="Expense Tracker"
        description="Log, search, and analyze every expense."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus /> Add Expense
          </Button>
        }
      />

      <Card className="mb-4 flex-row flex-wrap items-center gap-3 py-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="amount-desc">Amount: High to Low</SelectItem>
            <SelectItem value="amount-asc">Amount: Low to High</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto text-sm">
          <span className="text-muted-foreground">Total: </span>
          <span className="font-semibold">{formatCurrency(total)}</span>
        </div>
      </Card>

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No expenses found.
                  </td>
                </tr>
              )}
              {filtered.map((expense) => (
                <tr key={expense.id} className="border-b border-border/40 last:border-0 hover:bg-accent/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{expense.description}</span>
                      {expense.recurring && (
                        <Badge variant="outline" className="gap-1">
                          <Repeat className="size-3" /> Recurring
                        </Badge>
                      )}
                    </div>
                    {expense.notes && <p className="text-xs text-muted-foreground">{expense.notes}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{expense.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(expense.date)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={expense.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(expense.amount)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => {
                          setEditing(expense);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-destructive"
                        onClick={() => {
                          removeExpense(expense.id);
                          toast("Expense deleted");
                        }}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ExpenseDialog open={dialogOpen} onOpenChange={setDialogOpen} initialValue={editing} onSubmit={handleSubmit} />
    </div>
  );
}

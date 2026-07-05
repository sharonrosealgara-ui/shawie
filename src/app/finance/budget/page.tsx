"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BudgetCategoryCard } from "@/components/budget/budget-category-card";
import { BudgetCategoryDialog, type BudgetCategoryFormValues } from "@/components/budget/budget-category-dialog";
import { useBudgetStore } from "@/store/budget-store";
import { useSettingsStore } from "@/store/settings-store";
import { formatCurrency, clampPercent } from "@/lib/format";
import type { BudgetCategory, ItemStatus } from "@/types";

const GROUPS: BudgetCategory["group"][] = ["Fixed Expenses", "Savings", "Lifestyle"];

export default function BudgetPage() {
  const categories = useBudgetStore((s) => s.categories);
  const addCategory = useBudgetStore((s) => s.addCategory);
  const updateCategory = useBudgetStore((s) => s.updateCategory);
  const removeCategory = useBudgetStore((s) => s.removeCategory);
  const setStatus = useBudgetStore((s) => s.setStatus);
  const salary = useSettingsStore((s) => s.settings.monthlySalary);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BudgetCategory | null>(null);

  const totalBudgeted = categories.reduce((sum, c) => sum + c.amount, 0);
  const allocationPercent = salary > 0 ? clampPercent((totalBudgeted / salary) * 100) : 0;

  function handleSubmit(values: BudgetCategoryFormValues) {
    if (editing) {
      updateCategory(editing.id, values);
      toast.success("Category updated");
    } else {
      addCategory({ ...values, status: "pending", spent: 0 });
      toast.success("Category added");
    }
  }

  function handleStatusChange(id: string, status: ItemStatus) {
    setStatus(id, status);
  }

  return (
    <div>
      <PageHeader
        title="Monthly Budget"
        description="Plan and track every peso of your monthly income."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus /> Add Category
          </Button>
        }
      />

      <Card className="mb-6 gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">Total Allocation</p>
            <p className="text-2xl font-semibold">
              {formatCurrency(totalBudgeted)} <span className="text-sm font-normal text-muted-foreground">of {formatCurrency(salary)}</span>
            </p>
          </div>
          <span
            className={
              totalBudgeted === salary ? "text-sm font-medium text-success" : "text-sm font-medium text-warning"
            }
          >
            {totalBudgeted === salary ? "Fully allocated ✓" : `${formatCurrency(Math.abs(salary - totalBudgeted))} ${totalBudgeted > salary ? "over" : "unallocated"}`}
          </span>
        </div>
        <Progress value={allocationPercent} />
      </Card>

      {GROUPS.map((group) => {
        const groupCategories = categories.filter((c) => c.group === group);
        const groupTotal = groupCategories.reduce((sum, c) => sum + c.amount, 0);
        if (groupCategories.length === 0) return null;
        return (
          <div key={group} className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{group}</h2>
              <span className="text-sm font-medium">{formatCurrency(groupTotal)}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupCategories.map((category) => (
                <BudgetCategoryCard
                  key={category.id}
                  category={category}
                  onEdit={() => {
                    setEditing(category);
                    setDialogOpen(true);
                  }}
                  onDelete={() => {
                    removeCategory(category.id);
                    toast("Category deleted");
                  }}
                  onStatusChange={(status) => handleStatusChange(category.id, status)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <BudgetCategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} initialValue={editing} onSubmit={handleSubmit} />
    </div>
  );
}

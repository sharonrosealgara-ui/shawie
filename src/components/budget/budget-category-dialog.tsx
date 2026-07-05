"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { BudgetCategory } from "@/types";

const schema = z.object({
  group: z.enum(["Fixed Expenses", "Savings", "Lifestyle"]),
  category: z.string().min(1, "Category name is required"),
  amount: z.coerce.number().min(0, "Must be 0 or more"),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  notes: z.string().optional(),
});

export type BudgetCategoryFormValues = z.infer<typeof schema>;
type BudgetCategoryFormInput = z.input<typeof schema>;

export function BudgetCategoryDialog({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: BudgetCategory | null;
  onSubmit: (values: BudgetCategoryFormValues) => void;
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetCategoryFormInput, unknown, BudgetCategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      group: "Fixed Expenses",
      category: "",
      amount: 0,
      dueDate: "",
      priority: "medium",
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialValue
          ? {
              group: initialValue.group,
              category: initialValue.category,
              amount: initialValue.amount,
              dueDate: initialValue.dueDate ?? "",
              priority: initialValue.priority,
              notes: initialValue.notes ?? "",
            }
          : { group: "Fixed Expenses", category: "", amount: 0, dueDate: "", priority: "medium", notes: "" }
      );
    }
  }, [open, initialValue, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue ? "Edit Budget Category" : "Add Budget Category"}</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => {
            onSubmit(values);
            onOpenChange(false);
          })}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="category">Category Name</Label>
              <Input id="category" {...register("category")} placeholder="e.g. Groceries" />
              {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Group</Label>
              <Controller
                control={control}
                name="group"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fixed Expenses">Fixed Expenses</SelectItem>
                      <SelectItem value="Savings">Savings</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Priority</Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="amount">Budget Amount (₱)</Label>
              <Input id="amount" type="number" step="0.01" {...register("amount")} />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dueDate">Due Date (day)</Label>
              <Input id="dueDate" placeholder="e.g. 15" {...register("dueDate")} />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" {...register("notes")} placeholder="Optional notes" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialValue ? "Save Changes" : "Add Category"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

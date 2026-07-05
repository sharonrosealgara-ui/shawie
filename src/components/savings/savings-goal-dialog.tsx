"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SavingsGoal } from "@/types";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  targetAmount: z.coerce.number().min(1, "Must be greater than 0"),
  currentAmount: z.coerce.number().min(0),
  monthlyContribution: z.coerce.number().min(0),
  targetDate: z.string().optional(),
});

export type SavingsGoalFormValues = z.infer<typeof schema>;
type SavingsGoalFormInput = z.input<typeof schema>;

export function SavingsGoalDialog({
  open,
  onOpenChange,
  initialValue,
  category,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: SavingsGoal | null;
  category: "savings" | "dream";
  onSubmit: (values: SavingsGoalFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SavingsGoalFormInput, unknown, SavingsGoalFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", targetAmount: 0, currentAmount: 0, monthlyContribution: 0, targetDate: "" },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialValue
          ? {
              name: initialValue.name,
              targetAmount: initialValue.targetAmount,
              currentAmount: initialValue.currentAmount,
              monthlyContribution: initialValue.monthlyContribution,
              targetDate: initialValue.targetDate?.slice(0, 10) ?? "",
            }
          : { name: "", targetAmount: 0, currentAmount: 0, monthlyContribution: 0, targetDate: "" }
      );
    }
  }, [open, initialValue, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue ? "Edit Goal" : `Add ${category === "dream" ? "Dream" : "Savings"} Goal`}</DialogTitle>
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
              <Label htmlFor="name">Goal Name</Label>
              <Input id="name" {...register("name")} placeholder="e.g. New Laptop" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="targetAmount">Target Amount (₱)</Label>
              <Input id="targetAmount" type="number" {...register("targetAmount")} />
              {errors.targetAmount && <p className="text-xs text-destructive">{errors.targetAmount.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currentAmount">Current Saved (₱)</Label>
              <Input id="currentAmount" type="number" {...register("currentAmount")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="monthlyContribution">Monthly Contribution (₱)</Label>
              <Input id="monthlyContribution" type="number" {...register("monthlyContribution")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input id="targetDate" type="date" {...register("targetDate")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialValue ? "Save Changes" : "Add Goal"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Bill } from "@/types";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number().min(0.01, "Must be greater than 0"),
  dueDay: z.coerce.number().min(1).max(31),
  category: z.string().min(1, "Category is required"),
  reminderDaysBefore: z.coerce.number().min(0).max(30),
});

export type BillFormValues = z.infer<typeof schema>;
type BillFormInput = z.input<typeof schema>;

export function BillDialog({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: Bill | null;
  onSubmit: (values: BillFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BillFormInput, unknown, BillFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", amount: 0, dueDay: 1, category: "", reminderDaysBefore: 3 },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialValue
          ? {
              name: initialValue.name,
              amount: initialValue.amount,
              dueDay: initialValue.dueDay,
              category: initialValue.category,
              reminderDaysBefore: initialValue.reminderDaysBefore,
            }
          : { name: "", amount: 0, dueDay: 1, category: "", reminderDaysBefore: 3 }
      );
    }
  }, [open, initialValue, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue ? "Edit Bill" : "Add Bill"}</DialogTitle>
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
              <Label htmlFor="name">Bill Name</Label>
              <Input id="name" {...register("name")} placeholder="e.g. Netflix" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="amount">Amount (₱)</Label>
              <Input id="amount" type="number" {...register("amount")} />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="dueDay">Due Day of Month</Label>
              <Input id="dueDay" type="number" min={1} max={31} {...register("dueDay")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register("category")} placeholder="e.g. Subscription" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reminderDaysBefore">Remind Days Before</Label>
              <Input id="reminderDaysBefore" type="number" min={0} max={30} {...register("reminderDaysBefore")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialValue ? "Save Changes" : "Add Bill"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

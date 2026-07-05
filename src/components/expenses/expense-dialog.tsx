"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { Expense } from "@/types";

const schema = z.object({
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().min(0.01, "Must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["pending", "paid", "done"]),
  recurring: z.boolean(),
  notes: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof schema>;
type ExpenseFormInput = z.input<typeof schema>;

const CATEGORY_OPTIONS = ["Needs", "Wants", "Fixed Expenses", "Savings", "Other"];

export function ExpenseDialog({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: Expense | null;
  onSubmit: (values: ExpenseFormValues) => void;
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormInput, unknown, ExpenseFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      category: "Needs",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      status: "pending",
      recurring: false,
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialValue
          ? {
              description: initialValue.description,
              category: initialValue.category,
              amount: initialValue.amount,
              date: initialValue.date.slice(0, 10),
              status: initialValue.status,
              recurring: initialValue.recurring,
              notes: initialValue.notes ?? "",
            }
          : {
              description: "",
              category: "Needs",
              amount: 0,
              date: new Date().toISOString().slice(0, 10),
              status: "pending",
              recurring: false,
              notes: "",
            }
      );
    }
  }, [open, initialValue, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue ? "Edit Expense" : "Add Expense"}</DialogTitle>
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
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description")} placeholder="e.g. Grocery run" />
              {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="amount">Amount (₱)</Label>
              <Input id="amount" type="number" step="0.01" {...register("amount")} />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="date">Payment Date</Label>
              <Input id="date" type="date" {...register("date")} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="col-span-2 flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
              <Label htmlFor="recurring" className="cursor-pointer">Recurring Expense</Label>
              <Controller
                control={control}
                name="recurring"
                render={({ field }) => <Switch id="recurring" checked={field.value} onCheckedChange={field.onChange} />}
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" {...register("notes")} placeholder="Optional notes" />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <Label>Receipt</Label>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-4 text-sm text-muted-foreground hover:bg-accent/40"
                onClick={() => toast("Receipt uploads will be available once cloud storage is connected.")}
              >
                <Upload className="size-4" /> Upload receipt (coming soon)
              </button>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialValue ? "Save Changes" : "Add Expense"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

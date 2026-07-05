"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Bell, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { BillDialog, type BillFormValues } from "@/components/bills/bill-dialog";
import { useBillsStore } from "@/store/bills-store";
import { formatCurrency, formatDate, daysUntil } from "@/lib/format";
import { nextBillDueDate } from "@/lib/derived";
import type { Bill } from "@/types";

export default function BillsPage() {
  const bills = useBillsStore((s) => s.bills);
  const addBill = useBillsStore((s) => s.addBill);
  const updateBill = useBillsStore((s) => s.updateBill);
  const removeBill = useBillsStore((s) => s.removeBill);
  const markPaid = useBillsStore((s) => s.markPaid);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Bill | null>(null);

  function handleSubmit(values: BillFormValues) {
    if (editing) {
      updateBill(editing.id, values);
      toast.success("Bill updated");
    } else {
      addBill({ ...values, status: "pending" });
      toast.success("Bill added");
    }
  }

  return (
    <div>
      <PageHeader
        title="Bills"
        description="Track recurring bills and never miss a due date."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus /> Add Bill
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {bills.map((bill) => {
          const nextDue = nextBillDueDate(bill.dueDay);
          const days = daysUntil(nextDue);
          const reminderActive = days <= bill.reminderDaysBefore;

          return (
            <Card key={bill.id} className="gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{bill.name}</p>
                  <Badge variant="secondary" className="mt-1">
                    {bill.category}
                  </Badge>
                </div>
                <StatusBadge status={bill.status} />
              </div>

              <div>
                <p className="text-2xl font-semibold">{formatCurrency(bill.amount)}</p>
                <p className="text-xs text-muted-foreground">Next due {formatDate(nextDue)} ({days}d)</p>
              </div>

              {reminderActive && bill.status !== "paid" && (
                <p className="flex items-center gap-1.5 rounded-md bg-warning/15 px-2 py-1 text-xs font-medium text-warning">
                  <Bell className="size-3.5" /> Reminder: due soon
                </p>
              )}

              {bill.lastPaidDate && (
                <p className="text-xs text-muted-foreground">Last paid {formatDate(bill.lastPaidDate)}</p>
              )}

              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <Button size="sm" variant="outline" onClick={() => markPaid(bill.id)} disabled={bill.status === "paid"}>
                  <CheckCircle2 className="size-3.5" /> Mark Paid
                </Button>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => {
                      setEditing(bill);
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
                      removeBill(bill.id);
                      toast("Bill deleted");
                    }}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <BillDialog open={dialogOpen} onOpenChange={setDialogOpen} initialValue={editing} onSubmit={handleSubmit} />
    </div>
  );
}

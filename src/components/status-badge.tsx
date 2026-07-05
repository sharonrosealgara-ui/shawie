import { Badge } from "@/components/ui/badge";
import type { ItemStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<ItemStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  done: "Done",
};

const STATUS_CLASS: Record<ItemStatus, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  paid: "bg-primary/15 text-primary border-primary/30",
  done: "bg-success/15 text-success border-success/30",
};

export function StatusBadge({ status, className }: { status: ItemStatus; className?: string }) {
  return <Badge className={cn("border", STATUS_CLASS[status], className)}>{STATUS_LABEL[status]}</Badge>;
}

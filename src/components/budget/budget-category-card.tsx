"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, clampPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { BudgetCategory, ItemStatus } from "@/types";

const PRIORITY_CLASS: Record<string, string> = {
  low: "bg-secondary text-secondary-foreground",
  medium: "bg-accent text-accent-foreground",
  high: "bg-destructive/15 text-destructive",
};

export function BudgetCategoryCard({
  category,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  category: BudgetCategory;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: ItemStatus) => void;
}) {
  const percent = category.amount > 0 ? clampPercent((category.spent / category.amount) * 100) : 0;
  const remaining = category.amount - category.spent;

  return (
    <Card className="gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{category.category}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge className={cn("border-0", PRIORITY_CLASS[category.priority])}>{category.priority}</Badge>
            {category.dueDate && <Badge variant="outline">Due {category.dueDate}</Badge>}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7 shrink-0">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="size-3.5" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              <Trash2 className="size-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-semibold">{formatCurrency(category.amount)}</span>
          <span className="text-xs text-muted-foreground">{percent.toFixed(0)}% used</span>
        </div>
        <Progress value={percent} className="mt-2" />
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Spent {formatCurrency(category.spent)}</span>
          <span>{remaining >= 0 ? `${formatCurrency(remaining)} left` : `${formatCurrency(-remaining)} over`}</span>
        </div>
      </div>

      {category.notes && <p className="text-xs text-muted-foreground">{category.notes}</p>}

      <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="flex gap-1">
          {(["pending", "paid", "done"] as ItemStatus[]).map((status) => (
            <Button
              key={status}
              size="sm"
              variant={category.status === status ? "default" : "outline"}
              className="h-7 px-2 text-xs capitalize"
              onClick={() => onStatusChange(status)}
            >
              {status}
            </Button>
          ))}
        </div>
        <StatusBadge status={category.status} />
      </div>
    </Card>
  );
}

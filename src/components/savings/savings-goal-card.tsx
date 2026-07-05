"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2, Plus, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, formatDate } from "@/lib/format";
import { goalProjection } from "@/lib/derived";
import type { SavingsGoal } from "@/types";

export function SavingsGoalCard({
  goal,
  onEdit,
  onDelete,
  onContribute,
  onToggleMilestone,
}: {
  goal: SavingsGoal;
  onEdit: () => void;
  onDelete: () => void;
  onContribute: (amount: number) => void;
  onToggleMilestone: (milestoneId: string) => void;
}) {
  const [contribution, setContribution] = useState("");
  const percent = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
  const { monthsRemaining, estimatedDate } = goalProjection(goal);

  return (
    <Card className="gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <ProgressRing percent={percent} size={64} strokeWidth={6} />
          <div>
            <p className="font-semibold">{goal.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
            </p>
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

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <div>
          <p className="text-muted-foreground">Monthly Contribution</p>
          <p className="font-medium text-sm">{formatCurrency(goal.monthlyContribution)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Remaining</p>
          <p className="font-medium text-sm">{formatCurrency(remaining)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Estimated Completion</p>
          <p className="font-medium text-sm">
            {remaining <= 0 ? "Reached! 🎉" : estimatedDate ? formatDate(estimatedDate, { month: "short", year: "numeric", day: undefined }) : "Set a monthly contribution"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Target Date</p>
          <p className="font-medium text-sm">{goal.targetDate ? formatDate(goal.targetDate) : "—"}</p>
        </div>
      </div>

      {monthsRemaining != null && monthsRemaining > 0 && (
        <p className="rounded-md bg-accent/50 px-2 py-1 text-xs text-accent-foreground">
          ~{monthsRemaining} month{monthsRemaining !== 1 ? "s" : ""} to go at current pace
        </p>
      )}

      {goal.milestones.length > 0 && (
        <div className="flex flex-col gap-1.5 border-t border-border/60 pt-3">
          <p className="text-xs font-medium text-muted-foreground">Milestones</p>
          {goal.milestones.map((m) => (
            <label key={m.id} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox checked={m.reached} onCheckedChange={() => onToggleMilestone(m.id)} />
              <span className={m.reached ? "text-muted-foreground line-through" : ""}>
                {m.label} ({formatCurrency(m.amount)})
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-border/60 pt-3">
        <Input
          type="number"
          placeholder="Add contribution"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          className="h-8"
        />
        <Button
          size="sm"
          className="h-8 shrink-0"
          onClick={() => {
            const amount = parseFloat(contribution);
            if (!Number.isNaN(amount) && amount > 0) {
              onContribute(amount);
              setContribution("");
            }
          }}
        >
          <Plus className="size-3.5" /> Add
        </Button>
        {percent >= 100 && <Check className="size-4 text-success" />}
      </div>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SavingsGoalCard } from "@/components/savings/savings-goal-card";
import { SavingsGoalDialog, type SavingsGoalFormValues } from "@/components/savings/savings-goal-dialog";
import { useSavingsStore } from "@/store/savings-store";
import { formatCurrency } from "@/lib/format";
import type { SavingsGoal } from "@/types";

export default function SavingsGoalsPage() {
  const allGoals = useSavingsStore((s) => s.goals);
  const goals = allGoals.filter((g) => g.category === "savings");
  const addGoal = useSavingsStore((s) => s.addGoal);
  const updateGoal = useSavingsStore((s) => s.updateGoal);
  const removeGoal = useSavingsStore((s) => s.removeGoal);
  const contribute = useSavingsStore((s) => s.contribute);
  const toggleMilestone = useSavingsStore((s) => s.toggleMilestone);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SavingsGoal | null>(null);

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  function handleSubmit(values: SavingsGoalFormValues) {
    if (editing) {
      updateGoal(editing.id, values);
      toast.success("Goal updated");
    } else {
      addGoal({ ...values, milestones: [], category: "savings" });
      toast.success("Goal added");
    }
  }

  return (
    <div>
      <PageHeader
        title="Savings Goals"
        description="Track progress toward every savings goal."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus /> Add Goal
          </Button>
        }
      />

      <Card className="mb-6 flex-row items-center justify-between py-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Saved</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalSaved)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Combined Target</p>
          <p className="text-2xl font-semibold">{formatCurrency(totalTarget)}</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => (
          <SavingsGoalCard
            key={goal.id}
            goal={goal}
            onEdit={() => {
              setEditing(goal);
              setDialogOpen(true);
            }}
            onDelete={() => {
              removeGoal(goal.id);
              toast("Goal deleted");
            }}
            onContribute={(amount) => contribute(goal.id, amount)}
            onToggleMilestone={(milestoneId) => toggleMilestone(goal.id, milestoneId)}
          />
        ))}
      </div>

      <SavingsGoalDialog open={dialogOpen} onOpenChange={setDialogOpen} initialValue={editing} category="savings" onSubmit={handleSubmit} />
    </div>
  );
}

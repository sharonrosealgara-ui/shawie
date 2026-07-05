"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { SavingsGoalCard } from "@/components/savings/savings-goal-card";
import { SavingsGoalDialog, type SavingsGoalFormValues } from "@/components/savings/savings-goal-dialog";
import { useSavingsStore } from "@/store/savings-store";
import type { SavingsGoal } from "@/types";

export default function DreamGoalsPage() {
  const goals = useSavingsStore((s) => s.goals);
  const addGoal = useSavingsStore((s) => s.addGoal);
  const updateGoal = useSavingsStore((s) => s.updateGoal);
  const removeGoal = useSavingsStore((s) => s.removeGoal);
  const contribute = useSavingsStore((s) => s.contribute);
  const toggleMilestone = useSavingsStore((s) => s.toggleMilestone);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SavingsGoal | null>(null);

  function handleSubmit(values: SavingsGoalFormValues) {
    if (editing) {
      updateGoal(editing.id, values);
      toast.success("Goal updated");
    } else {
      addGoal({ ...values, milestones: [], category: "dream" });
      toast.success("Dream goal added");
    }
  }

  return (
    <div>
      <PageHeader
        title="Dream Goals"
        description="The big-picture goals worth saving for — Emergency Fund, Travel, Future House, Sister's Wedding, Church Anniversary, Retirement, Laptop, Family Fund, US Visa, and more."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus /> Add Dream Goal
          </Button>
        }
      />

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

      <SavingsGoalDialog open={dialogOpen} onOpenChange={setDialogOpen} initialValue={editing} category="dream" onSubmit={handleSubmit} />
    </div>
  );
}

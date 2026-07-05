import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavingsGoal } from "@/types";
import { SEED_SAVINGS_GOALS } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface SavingsState {
  goals: SavingsGoal[];
  addGoal: (goal: Omit<SavingsGoal, "id">) => void;
  updateGoal: (id: string, patch: Partial<SavingsGoal>) => void;
  removeGoal: (id: string) => void;
  contribute: (id: string, amount: number) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
}

export const useSavingsStore = create<SavingsState>()(
  persist(
    (set) => ({
      goals: SEED_SAVINGS_GOALS,
      addGoal: (goal) =>
        set((state) => ({ goals: [...state.goals, { ...goal, id: generateId() }] })),
      updateGoal: (id, patch) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
        })),
      removeGoal: (id) =>
        set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
      contribute: (id, amount) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id
              ? { ...g, currentAmount: Math.min(g.targetAmount, Math.max(0, g.currentAmount + amount)) }
              : g
          ),
        })),
      toggleMilestone: (goalId, milestoneId) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? {
                  ...g,
                  milestones: g.milestones.map((m) =>
                    m.id === milestoneId ? { ...m, reached: !m.reached } : m
                  ),
                }
              : g
          ),
        })),
    }),
    { name: "ai-life-os:savings", skipHydration: true }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BudgetCategory, ItemStatus } from "@/types";
import { SEED_BUDGET_CATEGORIES } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface BudgetState {
  categories: BudgetCategory[];
  addCategory: (category: Omit<BudgetCategory, "id">) => void;
  updateCategory: (id: string, patch: Partial<BudgetCategory>) => void;
  removeCategory: (id: string) => void;
  setStatus: (id: string, status: ItemStatus) => void;
  addSpent: (id: string, amount: number) => void;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      categories: SEED_BUDGET_CATEGORIES,
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, { ...category, id: generateId() }] })),
      updateCategory: (id, patch) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      removeCategory: (id) =>
        set((state) => ({ categories: state.categories.filter((c) => c.id !== id) })),
      setStatus: (id, status) =>
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, status } : c)),
        })),
      addSpent: (id, amount) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, spent: Math.max(0, c.spent + amount) } : c
          ),
        })),
    }),
    { name: "ai-life-os:budget", skipHydration: true }
  )
);

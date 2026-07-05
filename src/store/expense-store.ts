import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Expense } from "@/types";
import { SEED_EXPENSES } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, patch: Partial<Expense>) => void;
  removeExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: SEED_EXPENSES,
      addExpense: (expense) =>
        set((state) => ({ expenses: [{ ...expense, id: generateId() }, ...state.expenses] })),
      updateExpense: (id, patch) =>
        set((state) => ({
          expenses: state.expenses.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),
      removeExpense: (id) =>
        set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
    }),
    { name: "ai-life-os:expenses", skipHydration: true }
  )
);

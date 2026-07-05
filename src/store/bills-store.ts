import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Bill, ItemStatus } from "@/types";
import { SEED_BILLS } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface BillsState {
  bills: Bill[];
  addBill: (bill: Omit<Bill, "id">) => void;
  updateBill: (id: string, patch: Partial<Bill>) => void;
  removeBill: (id: string) => void;
  setStatus: (id: string, status: ItemStatus) => void;
  markPaid: (id: string) => void;
}

export const useBillsStore = create<BillsState>()(
  persist(
    (set) => ({
      bills: SEED_BILLS,
      addBill: (bill) => set((state) => ({ bills: [...state.bills, { ...bill, id: generateId() }] })),
      updateBill: (id, patch) =>
        set((state) => ({ bills: state.bills.map((b) => (b.id === id ? { ...b, ...patch } : b)) })),
      removeBill: (id) => set((state) => ({ bills: state.bills.filter((b) => b.id !== id) })),
      setStatus: (id, status) =>
        set((state) => ({ bills: state.bills.map((b) => (b.id === id ? { ...b, status } : b)) })),
      markPaid: (id) =>
        set((state) => ({
          bills: state.bills.map((b) =>
            b.id === id ? { ...b, status: "paid", lastPaidDate: new Date().toISOString() } : b
          ),
        })),
    }),
    { name: "ai-life-os:bills", skipHydration: true }
  )
);

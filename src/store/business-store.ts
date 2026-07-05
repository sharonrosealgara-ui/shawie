import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Business } from "@/types";
import { SEED_BUSINESSES } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface BusinessState {
  businesses: Business[];
  addBusiness: (business: Omit<Business, "id">) => void;
  updateBusiness: (id: string, patch: Partial<Business>) => void;
  removeBusiness: (id: string) => void;
  addTask: (businessId: string, title: string) => void;
  toggleTask: (businessId: string, taskId: string) => void;
  removeTask: (businessId: string, taskId: string) => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      businesses: SEED_BUSINESSES,
      addBusiness: (business) =>
        set((state) => ({ businesses: [...state.businesses, { ...business, id: generateId() }] })),
      updateBusiness: (id, patch) =>
        set((state) => ({
          businesses: state.businesses.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        })),
      removeBusiness: (id) =>
        set((state) => ({ businesses: state.businesses.filter((b) => b.id !== id) })),
      addTask: (businessId, title) =>
        set((state) => ({
          businesses: state.businesses.map((b) =>
            b.id === businessId
              ? { ...b, tasks: [...b.tasks, { id: generateId(), title, done: false }] }
              : b
          ),
        })),
      toggleTask: (businessId, taskId) =>
        set((state) => ({
          businesses: state.businesses.map((b) =>
            b.id === businessId
              ? {
                  ...b,
                  tasks: b.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
                }
              : b
          ),
        })),
      removeTask: (businessId, taskId) =>
        set((state) => ({
          businesses: state.businesses.map((b) =>
            b.id === businessId ? { ...b, tasks: b.tasks.filter((t) => t.id !== taskId) } : b
          ),
        })),
    }),
    { name: "ai-life-os:businesses", skipHydration: true }
  )
);

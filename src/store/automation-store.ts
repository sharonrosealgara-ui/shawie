import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AutomationCard } from "@/types";
import { SEED_AUTOMATIONS } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface AutomationState {
  automations: AutomationCard[];
  addAutomation: (automation: Omit<AutomationCard, "id" | "logs">) => void;
  updateAutomation: (id: string, patch: Partial<AutomationCard>) => void;
  removeAutomation: (id: string) => void;
  toggleStatus: (id: string) => void;
  runAutomation: (id: string) => void;
}

export const useAutomationStore = create<AutomationState>()(
  persist(
    (set) => ({
      automations: SEED_AUTOMATIONS,
      addAutomation: (automation) =>
        set((state) => ({
          automations: [...state.automations, { ...automation, id: generateId(), logs: [] }],
        })),
      updateAutomation: (id, patch) =>
        set((state) => ({
          automations: state.automations.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        })),
      removeAutomation: (id) =>
        set((state) => ({ automations: state.automations.filter((a) => a.id !== id) })),
      toggleStatus: (id) =>
        set((state) => ({
          automations: state.automations.map((a) =>
            a.id === id ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a
          ),
        })),
      runAutomation: (id) =>
        set((state) => ({
          automations: state.automations.map((a) =>
            a.id === id
              ? {
                  ...a,
                  lastRun: new Date().toISOString(),
                  status: "active",
                  logs: [
                    { id: generateId(), timestamp: new Date().toISOString(), message: `${a.name} executed successfully (simulated run — connect an API key in Settings to go live).` },
                    ...a.logs,
                  ].slice(0, 20),
                }
              : a
          ),
        })),
    }),
    { name: "ai-life-os:automations", skipHydration: true }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Settings } from "@/types";
import { DEFAULT_SETTINGS } from "@/lib/seed-data";

interface SettingsState {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    { name: "ai-life-os:settings", skipHydration: true }
  )
);

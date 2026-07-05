import { useSettingsStore } from "@/store/settings-store";
import { useBudgetStore } from "@/store/budget-store";
import { useExpenseStore } from "@/store/expense-store";
import { useSavingsStore } from "@/store/savings-store";
import { useBillsStore } from "@/store/bills-store";
import { useCalendarStore } from "@/store/calendar-store";
import { useCareerStore } from "@/store/career-store";
import { useProjectStore } from "@/store/project-store";
import { useBusinessStore } from "@/store/business-store";
import { useSocialStore } from "@/store/social-store";
import { useAutomationStore } from "@/store/automation-store";
import { useLearningStore } from "@/store/learning-store";

const STORE_REGISTRY = {
  settings: useSettingsStore,
  budget: useBudgetStore,
  expenses: useExpenseStore,
  savings: useSavingsStore,
  bills: useBillsStore,
  calendar: useCalendarStore,
  career: useCareerStore,
  projects: useProjectStore,
  businesses: useBusinessStore,
  social: useSocialStore,
  automations: useAutomationStore,
  learning: useLearningStore,
} as const;

export function exportAllData() {
  const payload: Record<string, unknown> = { exportedAt: new Date().toISOString() };
  for (const [key, store] of Object.entries(STORE_REGISTRY)) {
    payload[key] = store.getState();
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ai-life-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function importAllData(file: File): Promise<{ success: boolean; error?: string }> {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text) as Record<string, unknown>;

    for (const [key, store] of Object.entries(STORE_REGISTRY)) {
      const data = parsed[key];
      if (data && typeof data === "object") {
        const setState = store.setState as (state: unknown, replace: true) => void;
        setState(data, true);
      }
    }
    return { success: true };
  } catch {
    return { success: false, error: "Invalid backup file. Please select a valid AI Life OS export." };
  }
}

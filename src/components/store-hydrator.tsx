"use client";

import { useEffect } from "react";
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
import { useUIStore } from "@/store/ui-store";

const STORES = [
  useSettingsStore,
  useBudgetStore,
  useExpenseStore,
  useSavingsStore,
  useBillsStore,
  useCalendarStore,
  useCareerStore,
  useProjectStore,
  useBusinessStore,
  useSocialStore,
  useAutomationStore,
  useLearningStore,
  useUIStore,
];

export function StoreHydrator() {
  useEffect(() => {
    STORES.forEach((store) => store.persist.rehydrate());
  }, []);

  return null;
}

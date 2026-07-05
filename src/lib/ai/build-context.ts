import type { AIAssistantContext } from "@/lib/ai/types";
import { computeFinanceSnapshot, upcomingBills, goalProjection } from "@/lib/derived";
import { useSettingsStore } from "@/store/settings-store";
import { useBudgetStore } from "@/store/budget-store";
import { useSavingsStore } from "@/store/savings-store";
import { useExpenseStore } from "@/store/expense-store";
import { useBillsStore } from "@/store/bills-store";

export function useAIAssistantContext(): AIAssistantContext {
  const salary = useSettingsStore((s) => s.settings.monthlySalary);
  const categories = useBudgetStore((s) => s.categories);
  const goals = useSavingsStore((s) => s.goals);
  const expenses = useExpenseStore((s) => s.expenses);
  const bills = useBillsStore((s) => s.bills);

  const snapshot = computeFinanceSnapshot(salary, categories, goals, expenses);
  const needs = categories.find((c) => c.category === "Needs");
  const wants = categories.find((c) => c.category === "Wants");
  const due = upcomingBills(bills, 14).map(({ bill, dueDate }) => ({
    name: bill.name,
    amount: bill.amount,
    daysUntilDue: Math.max(0, Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
  }));

  return {
    monthlySalary: salary,
    totalBudgeted: snapshot.totalBudgeted,
    totalSpent: snapshot.totalSpent,
    remainingBalance: snapshot.remainingBalance,
    savingsRate: snapshot.savingsRate,
    financialHealthScore: snapshot.financialHealthScore,
    financialHealthReasons: snapshot.financialHealthReasons,
    needsAmount: needs?.amount ?? 0,
    wantsAmount: wants?.amount ?? 0,
    needsSpent: needs?.spent ?? 0,
    wantsSpent: wants?.spent ?? 0,
    upcomingBills: due,
    goals: goals.map((g) => ({
      name: g.name,
      targetAmount: g.targetAmount,
      currentAmount: g.currentAmount,
      monthlyContribution: g.monthlyContribution,
      monthsRemaining: goalProjection(g).monthsRemaining,
      targetDate: g.targetDate,
    })),
  };
}

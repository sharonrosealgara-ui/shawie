import type { BudgetCategory, Bill, SavingsGoal, Expense } from "@/types";

export interface FinanceSnapshot {
  monthlySalary: number;
  totalBudgeted: number;
  totalSpent: number;
  remainingBalance: number;
  totalSavingsAllocated: number;
  totalSavingsSaved: number;
  totalSavingsTarget: number;
  pendingCount: number;
  paidCount: number;
  doneCount: number;
  netWorth: number;
  savingsRate: number;
  financialHealthScore: number;
  financialHealthReasons: string[];
}

export function computeFinanceSnapshot(
  salary: number,
  categories: BudgetCategory[],
  goals: SavingsGoal[],
  expenses: Expense[]
): FinanceSnapshot {
  const totalBudgeted = categories.reduce((sum, c) => sum + c.amount, 0);
  const totalSpentFromExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalSpentFromCategories = categories.reduce((sum, c) => sum + c.spent, 0);
  const totalSpent = totalSpentFromExpenses + totalSpentFromCategories;
  const remainingBalance = salary - totalSpent;

  const savingsCategories = categories.filter((c) => c.group === "Savings");
  const totalSavingsAllocated = savingsCategories.reduce((sum, c) => sum + c.amount, 0);

  const savingsGoals = goals.filter((g) => g.category === "savings");
  const totalSavingsSaved = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalSavingsTarget = savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0);

  const pendingCount = categories.filter((c) => c.status === "pending").length;
  const paidCount = categories.filter((c) => c.status === "paid").length;
  const doneCount = categories.filter((c) => c.status === "done").length;

  const netWorth = totalSavingsSaved - Math.max(0, totalSpent - salary);
  const savingsRate = salary > 0 ? (totalSavingsAllocated / salary) * 100 : 0;

  const { score, reasons } = computeFinancialHealthScore({
    salary,
    totalBudgeted,
    totalSpent,
    savingsRate,
    pendingCount,
    totalCategories: categories.length,
  });

  return {
    monthlySalary: salary,
    totalBudgeted,
    totalSpent,
    remainingBalance,
    totalSavingsAllocated,
    totalSavingsSaved,
    totalSavingsTarget,
    pendingCount,
    paidCount,
    doneCount,
    netWorth,
    savingsRate,
    financialHealthScore: score,
    financialHealthReasons: reasons,
  };
}

function computeFinancialHealthScore(params: {
  salary: number;
  totalBudgeted: number;
  totalSpent: number;
  savingsRate: number;
  pendingCount: number;
  totalCategories: number;
}): { score: number; reasons: string[] } {
  const { salary, totalBudgeted, totalSpent, savingsRate, pendingCount, totalCategories } = params;
  let score = 50;
  const reasons: string[] = [];

  if (savingsRate >= 30) {
    score += 25;
    reasons.push(`Strong savings rate of ${savingsRate.toFixed(0)}% of income.`);
  } else if (savingsRate >= 15) {
    score += 15;
    reasons.push(`Healthy savings rate of ${savingsRate.toFixed(0)}% of income.`);
  } else {
    score += 5;
    reasons.push(`Savings rate is ${savingsRate.toFixed(0)}%; aim for 20%+.`);
  }

  const budgetUtilization = salary > 0 ? (totalBudgeted / salary) * 100 : 0;
  if (budgetUtilization <= 100) {
    score += 15;
    reasons.push("Your budget fully allocates income without overcommitting.");
  } else {
    score -= 15;
    reasons.push("Your budgeted categories exceed your monthly income.");
  }

  const overspend = totalSpent - salary;
  if (overspend > 0) {
    score -= 20;
    reasons.push("You're spending more than you earn this month.");
  } else {
    score += 10;
    reasons.push("You're living within your means this month.");
  }

  if (totalCategories > 0) {
    const pendingRatio = pendingCount / totalCategories;
    if (pendingRatio < 0.3) {
      score += 10;
    } else {
      reasons.push("Several budget categories are still pending payment.");
    }
  }

  return { score: Math.max(0, Math.min(100, Math.round(score))), reasons };
}

export function nextBillDueDate(dueDay: number, from: Date = new Date()): Date {
  const year = from.getFullYear();
  const month = from.getMonth();
  let due = new Date(year, month, dueDay);
  if (due < new Date(from.getFullYear(), from.getMonth(), from.getDate())) {
    due = new Date(year, month + 1, dueDay);
  }
  return due;
}

export function upcomingBills(bills: Bill[], withinDays = 14) {
  const now = new Date();
  return bills
    .map((bill) => ({ bill, dueDate: nextBillDueDate(bill.dueDay, now) }))
    .filter(({ dueDate }) => {
      const diff = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= withinDays;
    })
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
}

export function goalProjection(goal: SavingsGoal): { monthsRemaining: number | null; estimatedDate: Date | null } {
  const remaining = goal.targetAmount - goal.currentAmount;
  if (remaining <= 0) return { monthsRemaining: 0, estimatedDate: new Date() };
  if (goal.monthlyContribution <= 0) return { monthsRemaining: null, estimatedDate: null };
  const months = Math.ceil(remaining / goal.monthlyContribution);
  const estimatedDate = new Date();
  estimatedDate.setMonth(estimatedDate.getMonth() + months);
  return { monthsRemaining: months, estimatedDate };
}

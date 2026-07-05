import { generateId } from "@/lib/id";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { AIAssistantContext, AIAssistantService, AIInsight } from "@/lib/ai/types";

function findGoal(context: AIAssistantContext, keyword: string) {
  return context.goals.find((g) => g.name.toLowerCase().includes(keyword.toLowerCase()));
}

function describeGoalTimeline(goal: AIAssistantContext["goals"][number]): string {
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
  if (remaining <= 0) return `You've already reached your "${goal.name}" goal. 🎉`;
  if (goal.monthlyContribution <= 0) {
    return `You haven't set a monthly contribution for "${goal.name}" yet. Set one in Savings Goals to get an estimate.`;
  }
  if (goal.monthsRemaining == null) return `"${goal.name}" needs a monthly contribution to project a completion date.`;
  const years = Math.floor(goal.monthsRemaining / 12);
  const months = goal.monthsRemaining % 12;
  const parts = [years > 0 ? `${years} year${years > 1 ? "s" : ""}` : null, months > 0 ? `${months} month${months > 1 ? "s" : ""}` : null].filter(Boolean);
  return `At ${formatCurrency(goal.monthlyContribution)}/month, you'll reach your "${goal.name}" goal (${formatCurrency(goal.targetAmount)}) in about ${parts.join(" and ") || "less than a month"}.`;
}

function monthsUntil(targetDate?: string): number | null {
  if (!targetDate) return null;
  const target = new Date(targetDate);
  const now = new Date();
  return Math.max(0, (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth()));
}

export function generateInsights(context: AIAssistantContext): AIInsight[] {
  const insights: AIInsight[] = [];

  insights.push({
    id: generateId(),
    question: "What is my Financial Health Score and why?",
    answer: `Your Financial Health Score is ${context.financialHealthScore}/100. ${context.financialHealthReasons.join(" ")}`,
    tone: context.financialHealthScore >= 70 ? "positive" : context.financialHealthScore >= 45 ? "neutral" : "warning",
  });

  insights.push({
    id: generateId(),
    question: "What is my current savings rate?",
    answer: `You're allocating ${formatPercent(context.savingsRate)} of your monthly income (${formatCurrency(context.monthlySalary)}) toward savings. ${
      context.savingsRate >= 20
        ? "That's a great habit — keep it up!"
        : "Financial experts often recommend saving at least 20% of income if possible."
    }`,
    tone: context.savingsRate >= 20 ? "positive" : "neutral",
  });

  const wantsOverspend = context.wantsSpent - context.wantsAmount;
  insights.push({
    id: generateId(),
    question: "Am I overspending on Wants?",
    answer:
      wantsOverspend > 0
        ? `Yes — you've spent ${formatCurrency(context.wantsSpent)} against a ${formatCurrency(context.wantsAmount)} Wants budget, which is ${formatCurrency(wantsOverspend)} over.`
        : `You're within budget on Wants: ${formatCurrency(context.wantsSpent)} spent of ${formatCurrency(context.wantsAmount)} allocated.`,
    tone: wantsOverspend > 0 ? "warning" : "positive",
  });

  const dueThisWeek = context.upcomingBills.filter((b) => b.daysUntilDue <= 7);
  insights.push({
    id: generateId(),
    question: "Which bills are due this week?",
    answer:
      dueThisWeek.length > 0
        ? `You have ${dueThisWeek.length} bill${dueThisWeek.length > 1 ? "s" : ""} due this week: ${dueThisWeek
            .map((b) => `${b.name} (${formatCurrency(b.amount)}, in ${b.daysUntilDue}d)`)
            .join(", ")}.`
        : "No bills are due in the next 7 days. You're all clear!",
    tone: dueThisWeek.length > 0 ? "warning" : "positive",
  });

  insights.push({
    id: generateId(),
    question: "How much should I save this month?",
    answer: `Based on your budget, ${formatCurrency(context.totalBudgeted - context.needsAmount - context.wantsAmount)} is already allocated to savings this month. A good target is 20-30% of your ${formatCurrency(context.monthlySalary)} income, or ${formatCurrency(context.monthlySalary * 0.2)}-${formatCurrency(context.monthlySalary * 0.3)}.`,
    tone: "neutral",
  });

  const houseGoal = findGoal(context, "house");
  if (houseGoal) {
    insights.push({
      id: generateId(),
      question: "How long until I reach my house savings goal?",
      answer: describeGoalTimeline(houseGoal),
      tone: "neutral",
    });
  }

  const weddingGoal = findGoal(context, "wedding");
  if (weddingGoal) {
    const months = monthsUntil(weddingGoal.targetDate);
    const remaining = Math.max(0, weddingGoal.targetAmount - weddingGoal.currentAmount);
    const requiredMonthly = months && months > 0 ? remaining / months : remaining;
    insights.push({
      id: generateId(),
      question: "How much should I contribute monthly to reach my sister's wedding fund by next June?",
      answer:
        months != null
          ? `You need ${formatCurrency(remaining)} more and have about ${months} month${months !== 1 ? "s" : ""} left. Contribute roughly ${formatCurrency(requiredMonthly)}/month to hit your goal on time.`
          : `Set a target date on the Sister Wedding Fund goal to get a precise monthly contribution estimate.`,
      tone: requiredMonthly <= weddingGoal.monthlyContribution ? "positive" : "warning",
    });
  }

  const travelGoal = findGoal(context, "travel");
  if (travelGoal) {
    insights.push({
      id: generateId(),
      question: "Am I on track for my travel savings?",
      answer: describeGoalTimeline(travelGoal),
      tone: "neutral",
    });
  }

  return insights;
}

const PESO_REGEX = /(?:₱|php\s*)?([\d,]+(?:\.\d+)?)/i;

export function answerFreeform(question: string, context: AIAssistantContext): string {
  const q = question.toLowerCase();

  if (q.includes("afford")) {
    const match = q.match(PESO_REGEX);
    const amount = match ? parseFloat(match[1].replace(/,/g, "")) : null;
    if (amount == null) {
      return "Tell me the amount you're considering (e.g. \"Can I afford ₱2,000?\") and I'll check it against your remaining balance.";
    }
    if (amount <= context.remainingBalance) {
      return `Yes — you have ${formatCurrency(context.remainingBalance)} remaining this month, so a ${formatCurrency(amount)} purchase fits within your budget. Just make sure it doesn't pull from savings you need.`;
    }
    return `That might be tight. You have ${formatCurrency(context.remainingBalance)} remaining this month, which is ${formatCurrency(amount - context.remainingBalance)} short of ${formatCurrency(amount)}. Consider waiting or trimming your Wants budget.`;
  }

  if (q.includes("health score") || q.includes("financial health")) {
    return `Your Financial Health Score is ${context.financialHealthScore}/100. ${context.financialHealthReasons.join(" ")}`;
  }

  if (q.includes("savings rate")) {
    return `You're saving ${formatPercent(context.savingsRate)} of your income this month.`;
  }

  if (q.includes("bill") && (q.includes("week") || q.includes("due"))) {
    const dueThisWeek = context.upcomingBills.filter((b) => b.daysUntilDue <= 7);
    return dueThisWeek.length > 0
      ? `Due this week: ${dueThisWeek.map((b) => `${b.name} (${formatCurrency(b.amount)})`).join(", ")}.`
      : "No bills due in the next 7 days.";
  }

  if (q.includes("wants") && (q.includes("overspend") || q.includes("spending"))) {
    const diff = context.wantsSpent - context.wantsAmount;
    return diff > 0
      ? `You're ${formatCurrency(diff)} over your Wants budget.`
      : `You're within your Wants budget with ${formatCurrency(context.wantsAmount - context.wantsSpent)} left.`;
  }

  for (const goal of context.goals) {
    if (q.includes(goal.name.toLowerCase().split(" ")[0])) {
      return describeGoalTimeline(goal);
    }
  }

  if (q.includes("save") && q.includes("month")) {
    return `A good savings target is 20-30% of your ${formatCurrency(context.monthlySalary)} income — that's ${formatCurrency(
      context.monthlySalary * 0.2
    )} to ${formatCurrency(context.monthlySalary * 0.3)} per month.`;
  }

  return "I can help with affordability checks, savings targets, bill due dates, and goal timelines. Try asking something like \"Am I on track for my travel savings?\" or \"Can I afford ₱1,500?\"";
}

export class LocalRuleBasedAssistant implements AIAssistantService {
  name = "Local Rules Engine";

  async getInsights(context: AIAssistantContext): Promise<AIInsight[]> {
    return generateInsights(context);
  }

  async ask(question: string, context: AIAssistantContext): Promise<string> {
    return answerFreeform(question, context);
  }
}

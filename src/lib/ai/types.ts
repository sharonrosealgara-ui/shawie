export interface AIAssistantContext {
  monthlySalary: number;
  totalBudgeted: number;
  totalSpent: number;
  remainingBalance: number;
  savingsRate: number;
  financialHealthScore: number;
  financialHealthReasons: string[];
  needsAmount: number;
  wantsAmount: number;
  needsSpent: number;
  wantsSpent: number;
  upcomingBills: { name: string; amount: number; daysUntilDue: number }[];
  goals: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    monthlyContribution: number;
    monthsRemaining: number | null;
    targetDate?: string;
  }[];
}

export interface AIInsight {
  id: string;
  question: string;
  answer: string;
  tone: "positive" | "neutral" | "warning";
}

export interface AIAssistantService {
  /** Human readable name shown in the UI, e.g. "Local Rules Engine" or "Claude". */
  name: string;
  /** Generate the default dashboard of insights from current financial context. */
  getInsights(context: AIAssistantContext): Promise<AIInsight[]>;
  /** Answer a free-form question about the user's finances. */
  ask(question: string, context: AIAssistantContext): Promise<string>;
}

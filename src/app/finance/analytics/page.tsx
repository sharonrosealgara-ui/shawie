"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { ChartCard } from "@/components/charts/chart-card";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { useBudgetStore } from "@/store/budget-store";
import { useExpenseStore } from "@/store/expense-store";
import { useSavingsStore } from "@/store/savings-store";
import { useBillsStore } from "@/store/bills-store";
import { useSettingsStore } from "@/store/settings-store";
import { formatCurrency } from "@/lib/format";

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--chart-6)"];

export default function AnalyticsPage() {
  const categories = useBudgetStore((s) => s.categories);
  const expenses = useExpenseStore((s) => s.expenses);
  const goals = useSavingsStore((s) => s.goals);
  const bills = useBillsStore((s) => s.bills);
  const salary = useSettingsStore((s) => s.settings.monthlySalary);

  const budgetBreakdown = ["Fixed Expenses", "Savings", "Lifestyle"].map((group) => ({
    name: group,
    value: categories.filter((c) => c.group === group).reduce((sum, c) => sum + c.amount, 0),
  }));

  const savingsGrowth = Array.from({ length: 6 }).map((_, i) => {
    const monthLabel = new Date(new Date().setMonth(new Date().getMonth() - 5 + i)).toLocaleString("en-PH", { month: "short" });
    const total = goals
      .filter((g) => g.category === "savings")
      .reduce((sum, g) => sum + Math.max(0, g.currentAmount - g.monthlyContribution * (5 - i)), 0);
    return { month: monthLabel, savings: Math.round(total) };
  });

  const expenseTrends = Array.from({ length: 6 }).map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5 + i);
    const monthLabel = date.toLocaleString("en-PH", { month: "short" });
    const monthExpenses = expenses.filter((e) => new Date(e.date).getMonth() === date.getMonth());
    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    return { month: monthLabel, expenses: total };
  });

  const cashFlow = [
    { name: "Income", value: salary },
    { name: "Budgeted", value: categories.reduce((s, c) => s + c.amount, 0) },
    { name: "Spent", value: categories.reduce((s, c) => s + c.spent, 0) + expenses.reduce((s, e) => s + e.amount, 0) },
  ];

  const paidVsPending = [
    { name: "Paid", value: [...categories.map((c) => c.status), ...bills.map((b) => b.status)].filter((s) => s === "paid" || s === "done").length },
    { name: "Pending", value: [...categories.map((c) => c.status), ...bills.map((b) => b.status)].filter((s) => s === "pending").length },
  ];

  const needsCategory = categories.find((c) => c.category === "Needs");
  const wantsCategory = categories.find((c) => c.category === "Wants");
  const needsVsWants = [
    { name: "Needs", budgeted: needsCategory?.amount ?? 0, spent: needsCategory?.spent ?? 0 },
    { name: "Wants", budgeted: wantsCategory?.amount ?? 0, spent: wantsCategory?.spent ?? 0 },
  ];

  return (
    <div>
      <PageHeader title="Analytics" description="Deeper insight into where your money goes." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Budget Breakdown (Donut)" description="Fixed Expenses vs Savings vs Lifestyle">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip content={<ChartTooltip />} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Pie data={budgetBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                {budgetBreakdown.map((entry, i) => (
                  <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="var(--card)" strokeWidth={2} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Savings Growth (Area)" description="6-month trend across savings goals">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={savingsGrowth}>
              <defs>
                <linearGradient id="analyticsSavingsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="savings" name="Savings" stroke="var(--chart-2)" strokeWidth={2} fill="url(#analyticsSavingsFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Expense Trends (Line)" description="Monthly expense totals">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={expenseTrends}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="expenses" name="Expenses" stroke="var(--chart-6)" strokeWidth={2} dot={{ r: 4, fill: "var(--chart-6)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cash Flow (Bar)" description="Income, budgeted, and spent">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cashFlow} barCategoryGap={28}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)" }} />
              <Bar dataKey="value" name="Amount" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={64} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Paid vs Pending (Donut)" description="Across budget categories and bills">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip content={<ChartTooltip />} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Pie data={paidVsPending} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                <Cell fill="var(--chart-2)" stroke="var(--card)" strokeWidth={2} />
                <Cell fill="var(--chart-3)" stroke="var(--card)" strokeWidth={2} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Needs vs Wants (Bar)" description="Budgeted vs spent">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={needsVsWants} barCategoryGap={40}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="budgeted" name="Budgeted" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={48} />
              <Bar dataKey="spent" name="Spent" fill="var(--chart-6)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

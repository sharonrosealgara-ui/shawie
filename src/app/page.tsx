"use client";

import {
  Wallet,
  PiggyBank,
  Receipt,
  Landmark,
  Clock,
  CheckCircle2,
  BadgeCheck,
  TrendingUp,
  HeartPulse,
  CircleDollarSign,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/charts/chart-card";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDate } from "@/lib/format";
import { computeFinanceSnapshot, upcomingBills } from "@/lib/derived";
import { useBudgetStore } from "@/store/budget-store";
import { useSettingsStore } from "@/store/settings-store";
import { useSavingsStore } from "@/store/savings-store";
import { useExpenseStore } from "@/store/expense-store";
import { useBillsStore } from "@/store/bills-store";
import { useCareerStore } from "@/store/career-store";

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--chart-6)"];

export default function DashboardPage() {
  const salary = useSettingsStore((s) => s.settings.monthlySalary);
  const categories = useBudgetStore((s) => s.categories);
  const goals = useSavingsStore((s) => s.goals);
  const expenses = useExpenseStore((s) => s.expenses);
  const bills = useBillsStore((s) => s.bills);
  const careerGoals = useCareerStore((s) => s.goals);

  const snapshot = computeFinanceSnapshot(salary, categories, goals, expenses);
  const due = upcomingBills(bills, 14);

  const budgetBreakdown = ["Fixed Expenses", "Savings", "Lifestyle"].map((group) => ({
    name: group,
    value: categories.filter((c) => c.group === group).reduce((sum, c) => sum + c.amount, 0),
  }));

  const cashFlowData = [
    { name: "Income", amount: salary },
    { name: "Budgeted", amount: snapshot.totalBudgeted },
    { name: "Spent", amount: snapshot.totalSpent },
    { name: "Remaining", amount: Math.max(0, snapshot.remainingBalance) },
  ];

  const categorySpending = categories
    .filter((c) => c.spent > 0 || c.amount > 0)
    .slice(0, 8)
    .map((c) => ({ name: c.category, budgeted: c.amount, spent: c.spent }));

  const savingsGrowth = Array.from({ length: 6 }).map((_, i) => {
    const monthLabel = new Date(new Date().setMonth(new Date().getMonth() - 5 + i)).toLocaleString("en-PH", {
      month: "short",
    });
    const total = goals
      .filter((g) => g.category === "savings")
      .reduce((sum, g) => sum + Math.max(0, g.currentAmount - g.monthlyContribution * (5 - i)), 0);
    return { month: monthLabel, savings: Math.round(total) };
  });

  const billsProgress = [
    { name: "Paid", value: bills.filter((b) => b.status === "paid").length },
    { name: "Pending", value: bills.filter((b) => b.status !== "paid").length },
  ];

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const monthlyGoals = careerGoals.slice(0, 4);

  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back — here's your financial overview at a glance." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <StatCard label="Monthly Income" value={formatCurrency(salary)} icon={Wallet} accent="primary" />
        <StatCard
          label="Remaining Balance"
          value={formatCurrency(snapshot.remainingBalance)}
          icon={CircleDollarSign}
          accent={snapshot.remainingBalance >= 0 ? "success" : "destructive"}
        />
        <StatCard label="Total Budgeted" value={formatCurrency(snapshot.totalBudgeted)} icon={Landmark} accent="primary" />
        <StatCard label="Total Expenses" value={formatCurrency(snapshot.totalSpent)} icon={Receipt} accent="warning" />
        <StatCard label="Total Savings" value={formatCurrency(snapshot.totalSavingsSaved)} icon={PiggyBank} accent="success" />
        <StatCard label="Pending Payments" value={String(snapshot.pendingCount)} icon={Clock} accent="warning" />
        <StatCard label="Paid Payments" value={String(snapshot.paidCount)} icon={BadgeCheck} accent="primary" />
        <StatCard label="Completed Items" value={String(snapshot.doneCount)} icon={CheckCircle2} accent="success" />
        <StatCard label="Net Worth" value={formatCurrency(snapshot.netWorth)} icon={TrendingUp} accent="primary" />
        <StatCard
          label="Financial Health Score"
          value={`${snapshot.financialHealthScore}/100`}
          icon={HeartPulse}
          accent={snapshot.financialHealthScore >= 70 ? "success" : snapshot.financialHealthScore >= 45 ? "warning" : "destructive"}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Income vs Expenses" description="This month's cash movement">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={cashFlowData} barCategoryGap={28}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)" }} />
              <Bar dataKey="amount" name="Amount" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={56} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Savings Growth" description="Estimated 6-month trend across savings goals">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={savingsGrowth}>
              <defs>
                <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="savings" name="Savings" stroke="var(--chart-2)" strokeWidth={2} fill="url(#savingsFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Budget Breakdown" description="Allocation by group">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Tooltip content={<ChartTooltip />} />
              <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Pie data={budgetBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {budgetBreakdown.map((entry, index) => (
                  <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="var(--card)" strokeWidth={2} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Bills Progress" description="Paid vs pending this cycle">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Tooltip content={<ChartTooltip />} />
              <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Pie data={billsProgress} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                <Cell fill="var(--chart-2)" stroke="var(--card)" strokeWidth={2} />
                <Cell fill="var(--chart-3)" stroke="var(--card)" strokeWidth={2} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cash Flow" description="Income, budget, spend, and remainder">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="cashFlowFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="amount" name="Amount" stroke="var(--chart-1)" strokeWidth={2} fill="url(#cashFlowFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category Spending" description="Budgeted vs spent by category">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categorySpending} layout="vertical" barCategoryGap={14}>
              <CartesianGrid horizontal={false} stroke="var(--border)" />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => formatCurrency(v)} />
              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={110} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="budgeted" name="Budgeted" fill="var(--chart-1)" radius={[0, 4, 4, 0]} maxBarSize={14} />
              <Bar dataKey="spent" name="Spent" fill="var(--chart-6)" radius={[0, 4, 4, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {recentExpenses.length === 0 && <p className="text-sm text-muted-foreground">No recent activity yet.</p>}
            {recentExpenses.map((e) => (
              <div key={e.id} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{e.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(e.date)} · {e.category}</p>
                </div>
                <span className="shrink-0 font-medium">{formatCurrency(e.amount)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Upcoming Bills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {due.length === 0 && <p className="text-sm text-muted-foreground">Nothing due in the next 2 weeks.</p>}
            {due.map(({ bill, dueDate }) => (
              <div key={bill.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(dueDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatCurrency(bill.amount)}</span>
                  <StatusBadge status={bill.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Savings Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {goals
              .filter((g) => g.category === "savings")
              .slice(0, 4)
              .map((g) => {
                const pct = g.targetAmount > 0 ? (g.currentAmount / g.targetAmount) * 100 : 0;
                return (
                  <div key={g.id}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{g.name}</span>
                      <span className="text-muted-foreground">{pct.toFixed(0)}%</span>
                    </div>
                    <Progress value={pct} />
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>

      {monthlyGoals.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">Monthly Goals</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {monthlyGoals.map((g) => (
              <div key={g.id} className="rounded-lg border border-border/60 p-3">
                <p className="text-sm font-medium">{g.title}</p>
                <Progress value={g.progress} className="mt-2" />
                <p className="mt-1 text-xs text-muted-foreground">{g.progress}% complete</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

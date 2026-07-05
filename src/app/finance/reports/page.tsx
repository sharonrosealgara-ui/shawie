"use client";

import { useState } from "react";
import { FileDown, FileSpreadsheet, FileText, Printer } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useBudgetStore } from "@/store/budget-store";
import { useExpenseStore } from "@/store/expense-store";
import { useSavingsStore } from "@/store/savings-store";
import { useSettingsStore } from "@/store/settings-store";
import { computeFinanceSnapshot } from "@/lib/derived";
import { formatCurrency, formatDate } from "@/lib/format";
import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export";

export default function ReportsPage() {
  const categories = useBudgetStore((s) => s.categories);
  const expenses = useExpenseStore((s) => s.expenses);
  const goals = useSavingsStore((s) => s.goals);
  const salary = useSettingsStore((s) => s.settings.monthlySalary);
  const snapshot = computeFinanceSnapshot(salary, categories, goals, expenses);
  const [tab, setTab] = useState("monthly");

  const monthlyRows = categories.map((c) => ({
    Category: c.category,
    Group: c.group,
    Budgeted: c.amount,
    Spent: c.spent,
    Remaining: c.amount - c.spent,
    Status: c.status,
  }));
  const savingsRows = goals.map((g) => ({
    Goal: g.name,
    Type: g.category,
    Target: g.targetAmount,
    Saved: g.currentAmount,
    "Monthly Contribution": g.monthlyContribution,
    "% Complete": g.targetAmount > 0 ? Math.round((g.currentAmount / g.targetAmount) * 100) : 0,
  }));
  const expenseRows = expenses.map((e) => ({
    Description: e.description,
    Category: e.category,
    Date: formatDate(e.date),
    Amount: e.amount,
    Status: e.status,
  }));
  const cashFlowRows = [
    { Metric: "Monthly Income", Amount: salary },
    { Metric: "Total Budgeted", Amount: snapshot.totalBudgeted },
    { Metric: "Total Spent", Amount: snapshot.totalSpent },
    { Metric: "Remaining Balance", Amount: snapshot.remainingBalance },
    { Metric: "Net Worth", Amount: snapshot.netWorth },
  ];

  const REPORTS = {
    monthly: { title: "Monthly Report", rows: monthlyRows },
    savings: { title: "Savings Report", rows: savingsRows },
    expense: { title: "Expense Report", rows: expenseRows },
    cashflow: { title: "Cash Flow Report", rows: cashFlowRows },
  } as const;

  const active = REPORTS[tab as keyof typeof REPORTS];

  function handleExportPDF() {
    const rows = active.rows as Record<string, unknown>[];
    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
    exportToPDF(active.title, columns, rows.map((r) => columns.map((c) => String(r[c] ?? ""))));
  }

  return (
    <div>
      <PageHeader title="Reports" description="Generate and export financial reports." />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>

        {Object.entries(REPORTS).map(([key, report]) => (
          <TabsContent key={key} value={key}>
            <Card className="print:shadow-none">
              <CardHeader>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>Generated {formatDate(new Date())}</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                      {report.rows.length > 0 &&
                        Object.keys(report.rows[0]).map((col) => (
                          <th key={col} className="px-3 py-2 font-medium">
                            {col}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report.rows.map((row, i) => (
                      <tr key={i} className="border-b border-border/40 last:border-0">
                        {Object.entries(row).map(([col, value]) => (
                          <td key={col} className="px-3 py-2">
                            {typeof value === "number" && /amount|budget|spent|remaining|saved|target|contribution/i.test(col)
                              ? formatCurrency(value)
                              : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {report.rows.length === 0 && (
                      <tr>
                        <td className="px-3 py-6 text-center text-muted-foreground">No data yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
              <CardFooter className="flex-wrap gap-2 print:hidden">
                <Button variant="outline" size="sm" onClick={() => exportToCSV(report.title, report.rows as Record<string, unknown>[])}>
                  <FileDown /> Export CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportToExcel(report.title, report.title, report.rows as Record<string, unknown>[])}>
                  <FileSpreadsheet /> Export Excel
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <FileText /> Export PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer /> Print
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChartTooltip } from "@/components/charts/chart-tooltip";
import { StatCard } from "@/components/dashboard/stat-card";
import { useBusinessStore } from "@/store/business-store";
import { formatCurrency } from "@/lib/format";
import type { Business } from "@/types";

export function BusinessPanel({ business }: { business: Business }) {
  const updateBusiness = useBusinessStore((s) => s.updateBusiness);
  const addTask = useBusinessStore((s) => s.addTask);
  const toggleTask = useBusinessStore((s) => s.toggleTask);
  const removeTask = useBusinessStore((s) => s.removeTask);
  const [taskTitle, setTaskTitle] = useState("");

  const net = business.income - business.expenses;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Income" value={formatCurrency(business.income)} icon={TrendingUp} accent="success" />
        <StatCard label="Expenses" value={formatCurrency(business.expenses)} icon={TrendingDown} accent="warning" />
        <StatCard label="Net" value={formatCurrency(net)} icon={TrendingUp} accent={net >= 0 ? "success" : "destructive"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Revenue History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={business.revenueHistory} barCategoryGap={20}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} width={70} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--accent)" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="revenue" name="Revenue" fill="var(--chart-2)" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Bar dataKey="expenses" name="Expenses" fill="var(--chart-6)" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input placeholder="New task" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
              <Button
                onClick={() => {
                  if (!taskTitle.trim()) return;
                  addTask(business.id, taskTitle);
                  setTaskTitle("");
                }}
              >
                <Plus />
              </Button>
            </div>
            {business.tasks.length === 0 && <p className="py-2 text-center text-sm text-muted-foreground">No tasks yet.</p>}
            {business.tasks.map((task) => (
              <label key={task.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/60 p-2">
                <span className="flex items-center gap-2 text-sm">
                  <Checkbox checked={task.done} onCheckedChange={() => toggleTask(business.id, task.id)} />
                  <span className={task.done ? "text-muted-foreground line-through" : ""}>{task.title}</span>
                </span>
                <Button variant="ghost" size="icon" className="size-6 text-destructive" onClick={() => removeTask(business.id, task.id)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Marketing Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={6}
              placeholder="Marketing plans, campaign ideas, content strategy..."
              defaultValue={business.marketingNotes ?? ""}
              onBlur={(e) => updateBusiness(business.id, { marketingNotes: e.target.value })}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Download, Upload, Save } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useSettingsStore } from "@/store/settings-store";
import { useBudgetStore } from "@/store/budget-store";
import { exportAllData, importAllData } from "@/lib/backup";
import { formatCurrency } from "@/lib/format";

const THEME_COLORS = ["violet", "blue", "green", "rose", "amber"];

export default function SettingsPage() {
  const settings = useSettingsStore((s) => s.settings);
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const categories = useBudgetStore((s) => s.categories);
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [salaryInput, setSalaryInput] = useState(String(settings.monthlySalary));
  const totalBudgeted = categories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div>
      <PageHeader title="Settings" description="Configure your income, preferences, and data." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Income & Currency</CardTitle>
            <CardDescription>Your monthly salary drives every budget calculation.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="salary">Monthly Salary</Label>
              <div className="flex gap-2">
                <Input id="salary" type="number" value={salaryInput} onChange={(e) => setSalaryInput(e.target.value)} />
                <Button
                  onClick={() => {
                    const value = parseFloat(salaryInput);
                    if (!Number.isNaN(value) && value >= 0) {
                      updateSettings({ monthlySalary: value });
                      toast.success("Salary updated");
                    }
                  }}
                >
                  <Save className="size-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Currently budgeted: {formatCurrency(totalBudgeted)} of {formatCurrency(settings.monthlySalary)}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Currency</Label>
              <Select value={settings.currency} onValueChange={(v) => updateSettings({ currency: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PHP">PHP — Philippine Peso</SelectItem>
                  <SelectItem value="USD">USD — US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Appearance</CardTitle>
            <CardDescription>Theme and status color customization.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label>Dark Mode</Label>
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Card Accent Color</Label>
              <div className="flex gap-2">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color}
                    aria-label={color}
                    className="size-8 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      backgroundColor:
                        color === "violet" ? "#4a3aa7" : color === "blue" ? "#2a78d6" : color === "green" ? "#1baf7a" : color === "rose" ? "#e34948" : "#eda100",
                      borderColor: settings.cardAccent === color ? "var(--foreground)" : "transparent",
                    }}
                    onClick={() => updateSettings({ cardAccent: color, themeColor: color })}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["pending", "paid", "done"] as const).map((status) => (
                <div key={status} className="flex flex-col gap-1.5">
                  <Label className="capitalize">{status}</Label>
                  <Input
                    type="color"
                    value={settings.statusColors[status]}
                    onChange={(e) =>
                      updateSettings({ statusColors: { ...settings.statusColors, [status]: e.target.value } })
                    }
                    className="h-9 p-1"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Notifications</CardTitle>
            <CardDescription>Control reminder and alert preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Notifications</Label>
                <p className="text-xs text-muted-foreground">Bell icon and bill reminders in the top bar.</p>
              </div>
              <Switch
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => updateSettings({ notificationsEnabled: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Backup & Restore</CardTitle>
            <CardDescription>Export or import all of your AI Life OS data as JSON.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={exportAllData}>
              <Download className="size-4" /> Export Backup
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="size-4" /> Import Backup
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const result = await importAllData(file);
                if (result.success) {
                  toast.success("Data restored. Reloading...");
                  setTimeout(() => window.location.reload(), 800);
                } else {
                  toast.error(result.error ?? "Import failed");
                }
                e.target.value = "";
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

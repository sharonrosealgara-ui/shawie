import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  trend,
  accent = "primary",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
  trend?: { value: string; positive: boolean };
  accent?: "primary" | "success" | "warning" | "destructive";
}) {
  const accentClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", accentClasses[accent])}>
          <Icon className="size-4.5" />
        </div>
      </div>
      {(hint || trend) && (
        <div className="flex items-center gap-2 text-xs">
          {trend && (
            <span className={cn("font-medium", trend.positive ? "text-success" : "text-destructive")}>
              {trend.value}
            </span>
          )}
          {hint && <span className="text-muted-foreground">{hint}</span>}
        </div>
      )}
    </Card>
  );
}

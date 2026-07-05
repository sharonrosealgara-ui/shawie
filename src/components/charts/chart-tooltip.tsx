import type { TooltipContentProps } from "recharts";

export function ChartTooltip({ active, payload, label }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      {label != null && <p className="mb-1 font-medium text-popover-foreground">{label}</p>}
      <div className="flex flex-col gap-0.5">
        {payload.map((entry) => (
          <div key={entry.dataKey as string} className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-popover-foreground">
              {typeof entry.value === "number" ? entry.value.toLocaleString("en-PH") : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

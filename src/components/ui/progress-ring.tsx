import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ProgressRing({
  percent,
  size = 72,
  strokeWidth = 7,
  className,
  children,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: ReactNode;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-secondary"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="var(--chart-1)"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children ?? <span className="text-sm font-semibold">{clamped.toFixed(0)}%</span>}
      </div>
    </div>
  );
}

export function formatCurrency(amount: number, currency: string = "PHP"): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyPrecise(amount: number, currency: string = "PHP"): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`;
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...opts,
  }).format(d);
}

export function daysUntil(date: string | Date): number {
  const target = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

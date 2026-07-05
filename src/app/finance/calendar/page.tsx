"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBillsStore } from "@/store/bills-store";
import { useSavingsStore } from "@/store/savings-store";
import { useCalendarStore } from "@/store/calendar-store";
import { nextBillDueDate } from "@/lib/derived";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types";

const TYPE_COLOR: Record<CalendarEvent["type"], string> = {
  bill: "bg-chart-6",
  savings: "bg-chart-2",
  event: "bg-chart-5",
  career: "bg-chart-1",
  business: "bg-chart-3",
  social: "bg-chart-4",
};

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function CalendarPage() {
  const bills = useBillsStore((s) => s.bills);
  const goals = useSavingsStore((s) => s.goals);
  const events = useCalendarStore((s) => s.events);
  const addEvent = useCalendarStore((s) => s.addEvent);
  const removeEvent = useCalendarStore((s) => s.removeEvent);

  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string>(isoDate(new Date()));
  const [addOpen, setAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(isoDate(new Date()));

  const allEvents: (CalendarEvent & { amount?: number })[] = useMemo(() => {
    const billEvents: (CalendarEvent & { amount?: number })[] = bills.map((b) => ({
      id: `bill-${b.id}`,
      title: b.name,
      date: isoDate(nextBillDueDate(b.dueDay, cursor)),
      type: "bill",
      amount: b.amount,
    }));
    const goalEvents: (CalendarEvent & { amount?: number })[] = goals
      .filter((g) => g.targetDate)
      .map((g) => ({ id: `goal-${g.id}`, title: `${g.name} target date`, date: g.targetDate as string, type: "savings", amount: g.targetAmount }));
    return [...billEvents, ...goalEvents, ...events];
  }, [bills, goals, events, cursor]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const eventsByDate = useMemo(() => {
    const map = new Map<string, typeof allEvents>();
    for (const e of allEvents) {
      const key = e.date.slice(0, 10);
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return map;
  }, [allEvents]);

  const selectedEvents = eventsByDate.get(selectedDate) ?? [];

  return (
    <div>
      <PageHeader
        title="Calendar"
        description="Bills, savings milestones, and important dates in one view."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus /> Add Event
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              {cursor.toLocaleString("en-PH", { month: "long", year: "numeric" })}
            </h2>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="size-7" onClick={() => setCursor(new Date(year, month - 1, 1))}>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="size-7" onClick={() => setCursor(new Date(year, month + 1, 1))}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-1 font-medium">
                {d}
              </div>
            ))}
            {cells.map((date, i) => {
              if (!date) return <div key={`empty-${i}`} />;
              const key = isoDate(date);
              const dayEvents = eventsByDate.get(key) ?? [];
              const isToday = key === isoDate(new Date());
              const isSelected = key === selectedDate;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDate(key)}
                  className={cn(
                    "flex h-16 flex-col items-center gap-1 rounded-lg border border-transparent p-1 text-xs hover:bg-accent/50",
                    isSelected && "border-primary bg-accent",
                    isToday && !isSelected && "bg-secondary"
                  )}
                >
                  <span className={cn("font-medium", isToday && "text-primary")}>{date.getDate()}</span>
                  <div className="flex flex-wrap justify-center gap-0.5">
                    {dayEvents.slice(0, 4).map((e) => (
                      <span key={e.id} className={cn("size-1.5 rounded-full", TYPE_COLOR[e.type])} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-semibold">{formatDate(selectedDate)}</h2>
          <div className="flex flex-col gap-3">
            {selectedEvents.length === 0 && <p className="text-sm text-muted-foreground">No events on this day.</p>}
            {selectedEvents.map((e) => (
              <div key={e.id} className="flex items-start justify-between gap-2 rounded-lg border border-border/60 p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2 rounded-full", TYPE_COLOR[e.type])} />
                    <p className="text-sm font-medium">{e.title}</p>
                  </div>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {e.type}
                  </Badge>
                  {e.amount != null && <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(e.amount)}</p>}
                </div>
                {!e.id.startsWith("bill-") && !e.id.startsWith("goal-") && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-destructive"
                    onClick={() => {
                      removeEvent(e.id);
                      toast("Event removed");
                    }}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Calendar Event</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="event-title">Title</Label>
              <Input id="event-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Travel to Boracay" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="event-date">Date</Label>
              <Input id="event-date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!newTitle.trim()) return;
                addEvent({ title: newTitle, date: newDate, type: "event" });
                setNewTitle("");
                setAddOpen(false);
                toast.success("Event added");
              }}
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

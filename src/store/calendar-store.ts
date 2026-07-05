import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CalendarEvent } from "@/types";
import { generateId } from "@/lib/id";

interface CalendarState {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  removeEvent: (id: string) => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      events: [
        { id: generateId(), title: "Church Anniversary", date: "2026-06-15", type: "event" },
        { id: generateId(), title: "Sister's Wedding", date: "2026-06-22", type: "event" },
      ],
      addEvent: (event) => set((state) => ({ events: [...state.events, { ...event, id: generateId() }] })),
      removeEvent: (id) => set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
    }),
    { name: "ai-life-os:calendar", skipHydration: true }
  )
);

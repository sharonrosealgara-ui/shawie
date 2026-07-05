import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LearningTrack } from "@/types";
import { SEED_LEARNING_TRACKS } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface LearningState {
  tracks: LearningTrack[];
  addTrack: (track: Omit<LearningTrack, "id">) => void;
  updateTrack: (id: string, patch: Partial<LearningTrack>) => void;
  removeTrack: (id: string) => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      tracks: SEED_LEARNING_TRACKS,
      addTrack: (track) =>
        set((state) => ({ tracks: [...state.tracks, { ...track, id: generateId() }] })),
      updateTrack: (id, patch) =>
        set((state) => ({
          tracks: state.tracks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      removeTrack: (id) =>
        set((state) => ({ tracks: state.tracks.filter((t) => t.id !== id) })),
    }),
    { name: "ai-life-os:learning", skipHydration: true }
  )
);

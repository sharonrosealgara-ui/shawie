import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project } from "@/types";
import { SEED_PROJECTS } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: SEED_PROJECTS,
      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, { ...project, id: generateId() }] })),
      updateProject: (id, patch) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      removeProject: (id) =>
        set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
    }),
    { name: "ai-life-os:projects", skipHydration: true }
  )
);

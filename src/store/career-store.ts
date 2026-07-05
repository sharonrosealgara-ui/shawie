import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  JobApplication,
  Interview,
  Client,
  Certificate,
  ResumeVersion,
  CareerGoal,
  Skill,
  IncomeSource,
} from "@/types";
import {
  SEED_JOB_APPLICATIONS,
  SEED_INTERVIEWS,
  SEED_CLIENTS,
  SEED_CERTIFICATES,
  SEED_RESUMES,
  SEED_CAREER_GOALS,
  SEED_SKILLS,
  SEED_INCOME_SOURCES,
} from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface PortfolioItem {
  id: string;
  title: string;
  url?: string;
  description?: string;
}

interface CareerState {
  applications: JobApplication[];
  interviews: Interview[];
  clients: Client[];
  certificates: Certificate[];
  resumes: ResumeVersion[];
  coverLetters: ResumeVersion[];
  portfolioItems: PortfolioItem[];
  goals: CareerGoal[];
  skills: Skill[];
  incomeSources: IncomeSource[];

  addApplication: (item: Omit<JobApplication, "id">) => void;
  updateApplication: (id: string, patch: Partial<JobApplication>) => void;
  removeApplication: (id: string) => void;

  addInterview: (item: Omit<Interview, "id">) => void;
  removeInterview: (id: string) => void;

  addClient: (item: Omit<Client, "id">) => void;
  updateClient: (id: string, patch: Partial<Client>) => void;
  removeClient: (id: string) => void;

  addCertificate: (item: Omit<Certificate, "id">) => void;
  removeCertificate: (id: string) => void;

  addResume: (item: Omit<ResumeVersion, "id">) => void;
  removeResume: (id: string) => void;

  addCoverLetter: (item: Omit<ResumeVersion, "id">) => void;
  removeCoverLetter: (id: string) => void;

  addPortfolioItem: (item: Omit<PortfolioItem, "id">) => void;
  removePortfolioItem: (id: string) => void;

  addGoal: (item: Omit<CareerGoal, "id">) => void;
  updateGoal: (id: string, patch: Partial<CareerGoal>) => void;
  removeGoal: (id: string) => void;

  addSkill: (item: Omit<Skill, "id">) => void;
  updateSkill: (id: string, patch: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addIncomeSource: (item: Omit<IncomeSource, "id">) => void;
  removeIncomeSource: (id: string) => void;
}

export const useCareerStore = create<CareerState>()(
  persist(
    (set) => ({
      applications: SEED_JOB_APPLICATIONS,
      interviews: SEED_INTERVIEWS,
      clients: SEED_CLIENTS,
      certificates: SEED_CERTIFICATES,
      resumes: SEED_RESUMES,
      coverLetters: [],
      portfolioItems: [],
      goals: SEED_CAREER_GOALS,
      skills: SEED_SKILLS,
      incomeSources: SEED_INCOME_SOURCES,

      addApplication: (item) =>
        set((s) => ({ applications: [{ ...item, id: generateId() }, ...s.applications] })),
      updateApplication: (id, patch) =>
        set((s) => ({ applications: s.applications.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
      removeApplication: (id) => set((s) => ({ applications: s.applications.filter((a) => a.id !== id) })),

      addInterview: (item) => set((s) => ({ interviews: [{ ...item, id: generateId() }, ...s.interviews] })),
      removeInterview: (id) => set((s) => ({ interviews: s.interviews.filter((i) => i.id !== id) })),

      addClient: (item) => set((s) => ({ clients: [{ ...item, id: generateId() }, ...s.clients] })),
      updateClient: (id, patch) =>
        set((s) => ({ clients: s.clients.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      removeClient: (id) => set((s) => ({ clients: s.clients.filter((c) => c.id !== id) })),

      addCertificate: (item) => set((s) => ({ certificates: [{ ...item, id: generateId() }, ...s.certificates] })),
      removeCertificate: (id) => set((s) => ({ certificates: s.certificates.filter((c) => c.id !== id) })),

      addResume: (item) => set((s) => ({ resumes: [{ ...item, id: generateId() }, ...s.resumes] })),
      removeResume: (id) => set((s) => ({ resumes: s.resumes.filter((r) => r.id !== id) })),

      addCoverLetter: (item) => set((s) => ({ coverLetters: [{ ...item, id: generateId() }, ...s.coverLetters] })),
      removeCoverLetter: (id) => set((s) => ({ coverLetters: s.coverLetters.filter((r) => r.id !== id) })),

      addPortfolioItem: (item) => set((s) => ({ portfolioItems: [{ ...item, id: generateId() }, ...s.portfolioItems] })),
      removePortfolioItem: (id) => set((s) => ({ portfolioItems: s.portfolioItems.filter((p) => p.id !== id) })),

      addGoal: (item) => set((s) => ({ goals: [...s.goals, { ...item, id: generateId() }] })),
      updateGoal: (id, patch) =>
        set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)) })),
      removeGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),

      addSkill: (item) => set((s) => ({ skills: [...s.skills, { ...item, id: generateId() }] })),
      updateSkill: (id, patch) =>
        set((s) => ({ skills: s.skills.map((sk) => (sk.id === id ? { ...sk, ...patch } : sk)) })),
      removeSkill: (id) => set((s) => ({ skills: s.skills.filter((sk) => sk.id !== id) })),

      addIncomeSource: (item) => set((s) => ({ incomeSources: [...s.incomeSources, { ...item, id: generateId() }] })),
      removeIncomeSource: (id) => set((s) => ({ incomeSources: s.incomeSources.filter((i) => i.id !== id) })),
    }),
    { name: "ai-life-os:career", skipHydration: true }
  )
);

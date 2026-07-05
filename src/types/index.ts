// Core domain types for AI Life OS.
// Kept as plain serializable shapes so the persistence layer can be swapped
// (localStorage -> Supabase/Firebase/Postgres/Mongo) without touching UI code.

export type ID = string;

export type ItemStatus = "pending" | "paid" | "done";

export type Priority = "low" | "medium" | "high";

export interface BudgetCategory {
  id: ID;
  group: "Fixed Expenses" | "Savings" | "Lifestyle";
  category: string;
  amount: number;
  dueDate?: string; // ISO date, day-of-month style or full date
  priority: Priority;
  notes?: string;
  status: ItemStatus;
  spent: number; // amount already spent/contributed this month
  color?: string;
}

export interface Expense {
  id: ID;
  description: string;
  category: string;
  amount: number;
  date: string; // ISO
  status: ItemStatus;
  recurring: boolean;
  notes?: string;
  receiptUrl?: string;
}

export interface SavingsGoal {
  id: ID;
  name: string;
  icon?: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  targetDate?: string; // ISO
  milestones: { id: ID; label: string; amount: number; reached: boolean }[];
  color?: string;
  category: "savings" | "dream";
}

export interface Bill {
  id: ID;
  name: string;
  amount: number;
  dueDay: number; // day of month 1-31
  status: ItemStatus;
  lastPaidDate?: string;
  reminderDaysBefore: number;
  category: string;
  notes?: string;
}

export interface CalendarEvent {
  id: ID;
  title: string;
  date: string; // ISO
  type: "bill" | "savings" | "event" | "career" | "business" | "social";
  notes?: string;
}

export interface JobApplication {
  id: ID;
  company: string;
  role: string;
  status: "applied" | "interviewing" | "offer" | "rejected" | "accepted";
  appliedDate: string;
  notes?: string;
}

export interface Interview {
  id: ID;
  company: string;
  role: string;
  date: string;
  stage: string;
  notes?: string;
}

export interface Client {
  id: ID;
  name: string;
  company?: string;
  status: "active" | "past" | "lead";
  value?: number;
  notes?: string;
}

export interface Certificate {
  id: ID;
  name: string;
  issuer: string;
  dateEarned: string;
  credentialUrl?: string;
}

export interface ResumeVersion {
  id: ID;
  name: string;
  updatedDate: string;
  notes?: string;
}

export interface CareerGoal {
  id: ID;
  title: string;
  targetDate?: string;
  progress: number;
  done: boolean;
}

export interface Skill {
  id: ID;
  name: string;
  level: number; // 0-100
}

export interface IncomeSource {
  id: ID;
  name: string;
  amount: number;
  frequency: "monthly" | "one-time" | "weekly";
}

export interface Project {
  id: ID;
  name: string;
  description?: string;
  status: "planning" | "in-progress" | "completed" | "archived";
  priority: Priority;
  deadline?: string;
  progress: number;
  notes?: string;
}

export interface Business {
  id: ID;
  name: string;
  tagline?: string;
  income: number;
  expenses: number;
  tasks: { id: ID; title: string; done: boolean }[];
  projects: string[];
  marketingNotes?: string;
  documents: { id: ID; name: string; url?: string }[];
  revenueHistory: { month: string; revenue: number; expenses: number }[];
}

export interface SocialPost {
  id: ID;
  platform: "Facebook" | "Instagram" | "TikTok" | "LinkedIn";
  date: string;
  caption: string;
  hashtags?: string;
  status: "idea" | "scheduled" | "posted";
}

export interface ContentIdea {
  id: ID;
  title: string;
  platform: string;
  notes?: string;
}

export interface AutomationCard {
  id: ID;
  name: string;
  description: string;
  status: "active" | "inactive" | "error";
  lastRun?: string;
  logs: { id: ID; timestamp: string; message: string }[];
}

export interface LearningTrack {
  id: ID;
  name: string;
  progress: number;
  notes?: string;
  certificates: string[];
  projects: string[];
}

export interface Settings {
  monthlySalary: number;
  currency: string;
  themeColor: string;
  statusColors: {
    pending: string;
    paid: string;
    done: string;
  };
  notificationsEnabled: boolean;
  cardAccent: string;
}

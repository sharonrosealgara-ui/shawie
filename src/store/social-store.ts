import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SocialPost, ContentIdea } from "@/types";
import { SEED_SOCIAL_POSTS, SEED_CONTENT_IDEAS } from "@/lib/seed-data";
import { generateId } from "@/lib/id";

interface SocialState {
  posts: SocialPost[];
  ideas: ContentIdea[];
  captionLibrary: { id: string; text: string }[];
  hashtagLibrary: { id: string; text: string }[];
  checklist: { id: string; label: string; done: boolean }[];

  addPost: (post: Omit<SocialPost, "id">) => void;
  updatePost: (id: string, patch: Partial<SocialPost>) => void;
  removePost: (id: string) => void;

  addIdea: (idea: Omit<ContentIdea, "id">) => void;
  removeIdea: (id: string) => void;

  addCaption: (text: string) => void;
  removeCaption: (id: string) => void;

  addHashtag: (text: string) => void;
  removeHashtag: (id: string) => void;

  addChecklistItem: (label: string) => void;
  toggleChecklistItem: (id: string) => void;
  removeChecklistItem: (id: string) => void;
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set) => ({
      posts: SEED_SOCIAL_POSTS,
      ideas: SEED_CONTENT_IDEAS,
      captionLibrary: [],
      hashtagLibrary: [],
      checklist: [
        { id: generateId(), label: "Plan weekly content calendar", done: false },
        { id: generateId(), label: "Design graphics in Canva", done: false },
        { id: generateId(), label: "Schedule posts", done: false },
        { id: generateId(), label: "Engage with comments/DMs", done: false },
      ],

      addPost: (post) => set((s) => ({ posts: [...s.posts, { ...post, id: generateId() }] })),
      updatePost: (id, patch) =>
        set((s) => ({ posts: s.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      removePost: (id) => set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),

      addIdea: (idea) => set((s) => ({ ideas: [...s.ideas, { ...idea, id: generateId() }] })),
      removeIdea: (id) => set((s) => ({ ideas: s.ideas.filter((i) => i.id !== id) })),

      addCaption: (text) => set((s) => ({ captionLibrary: [...s.captionLibrary, { id: generateId(), text }] })),
      removeCaption: (id) => set((s) => ({ captionLibrary: s.captionLibrary.filter((c) => c.id !== id) })),

      addHashtag: (text) => set((s) => ({ hashtagLibrary: [...s.hashtagLibrary, { id: generateId(), text }] })),
      removeHashtag: (id) => set((s) => ({ hashtagLibrary: s.hashtagLibrary.filter((h) => h.id !== id) })),

      addChecklistItem: (label) =>
        set((s) => ({ checklist: [...s.checklist, { id: generateId(), label, done: false }] })),
      toggleChecklistItem: (id) =>
        set((s) => ({
          checklist: s.checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
        })),
      removeChecklistItem: (id) =>
        set((s) => ({ checklist: s.checklist.filter((c) => c.id !== id) })),
    }),
    { name: "ai-life-os:social", skipHydration: true }
  )
);

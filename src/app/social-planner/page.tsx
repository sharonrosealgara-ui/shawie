"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useSocialStore } from "@/store/social-store";
import { formatDate } from "@/lib/format";
import type { SocialPost } from "@/types";

const PLATFORMS: SocialPost["platform"][] = ["Facebook", "Instagram", "TikTok", "LinkedIn"];

function ContentCalendarTab() {
  const posts = useSocialStore((s) => s.posts);
  const addPost = useSocialStore((s) => s.addPost);
  const removePost = useSocialStore((s) => s.removePost);
  const [platform, setPlatform] = useState<SocialPost["platform"]>("Instagram");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [caption, setCaption] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Content Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Select value={platform} onValueChange={(v) => setPlatform(v as SocialPost["platform"])}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-40" />
          <Input placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="max-w-72" />
          <Button
            onClick={() => {
              if (!caption.trim()) return;
              addPost({ platform, date, caption, status: "scheduled" });
              setCaption("");
            }}
          >
            <Plus /> Schedule
          </Button>
        </div>
        {posts.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No posts scheduled yet.</p>}
        {posts
          .slice()
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/60 p-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{post.platform}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {post.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm">{post.caption}</p>
                <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
              </div>
              <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removePost(post.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

function CaptionLibraryTab() {
  const captions = useSocialStore((s) => s.captionLibrary);
  const addCaption = useSocialStore((s) => s.addCaption);
  const removeCaption = useSocialStore((s) => s.removeCaption);
  const [value, setValue] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Caption Library</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Textarea placeholder="Write a reusable caption..." value={value} onChange={(e) => setValue(e.target.value)} rows={2} />
          <Button
            onClick={() => {
              if (!value.trim()) return;
              addCaption(value);
              setValue("");
            }}
          >
            <Plus />
          </Button>
        </div>
        {captions.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No saved captions yet.</p>}
        {captions.map((c) => (
          <div key={c.id} className="flex items-start justify-between gap-2 rounded-lg border border-border/60 p-3 text-sm">
            <p>{c.text}</p>
            <Button variant="ghost" size="icon" className="size-6 shrink-0 text-destructive" onClick={() => removeCaption(c.id)}>
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ContentIdeasTab() {
  const ideas = useSocialStore((s) => s.ideas);
  const addIdea = useSocialStore((s) => s.addIdea);
  const removeIdea = useSocialStore((s) => s.removeIdea);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Content Ideas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Input placeholder="Idea title" value={title} onChange={(e) => setTitle(e.target.value)} className="max-w-64" />
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              if (!title.trim()) return;
              addIdea({ title, platform });
              setTitle("");
            }}
          >
            <Plus /> Add
          </Button>
        </div>
        {ideas.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No content ideas yet.</p>}
        {ideas.map((idea) => (
          <div key={idea.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/60 p-3">
            <div>
              <p className="text-sm font-medium">{idea.title}</p>
              <Badge variant="secondary" className="mt-1">
                {idea.platform}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeIdea(idea.id)}>
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function HashtagLibraryTab() {
  const hashtags = useSocialStore((s) => s.hashtagLibrary);
  const addHashtag = useSocialStore((s) => s.addHashtag);
  const removeHashtag = useSocialStore((s) => s.removeHashtag);
  const [value, setValue] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Hashtag Library</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Input placeholder="#coffee #brewbloom" value={value} onChange={(e) => setValue(e.target.value)} />
          <Button
            onClick={() => {
              if (!value.trim()) return;
              addHashtag(value);
              setValue("");
            }}
          >
            <Plus />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {hashtags.length === 0 && <p className="text-sm text-muted-foreground">No hashtag sets saved yet.</p>}
          {hashtags.map((h) => (
            <Badge key={h.id} variant="secondary" className="gap-1.5">
              {h.text}
              <button onClick={() => removeHashtag(h.id)} aria-label="Remove hashtag set">
                <Trash2 className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ChecklistTab() {
  const checklist = useSocialStore((s) => s.checklist);
  const addChecklistItem = useSocialStore((s) => s.addChecklistItem);
  const toggleChecklistItem = useSocialStore((s) => s.toggleChecklistItem);
  const removeChecklistItem = useSocialStore((s) => s.removeChecklistItem);
  const [label, setLabel] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Publishing Checklist</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input placeholder="New checklist item" value={label} onChange={(e) => setLabel(e.target.value)} />
          <Button
            onClick={() => {
              if (!label.trim()) return;
              addChecklistItem(label);
              setLabel("");
            }}
          >
            <Plus />
          </Button>
        </div>
        {checklist.map((item) => (
          <label key={item.id} className="flex items-center justify-between gap-2 rounded-lg border border-border/60 p-2">
            <span className="flex items-center gap-2 text-sm">
              <Checkbox checked={item.done} onCheckedChange={() => toggleChecklistItem(item.id)} />
              <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
            </span>
            <Button variant="ghost" size="icon" className="size-6 text-destructive" onClick={() => removeChecklistItem(item.id)}>
              <Trash2 className="size-3.5" />
            </Button>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}

export default function SocialPlannerPage() {
  return (
    <div>
      <PageHeader title="Social Planner" description="Plan content across Facebook, Instagram, TikTok, and LinkedIn." />
      <Tabs defaultValue="calendar">
        <TabsList className="mb-4 h-auto flex-wrap">
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="captions">Caption Library</TabsTrigger>
          <TabsTrigger value="ideas">Content Ideas</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtag Library</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <ContentCalendarTab />
        </TabsContent>
        <TabsContent value="captions">
          <CaptionLibraryTab />
        </TabsContent>
        <TabsContent value="ideas">
          <ContentIdeasTab />
        </TabsContent>
        <TabsContent value="hashtags">
          <HashtagLibraryTab />
        </TabsContent>
        <TabsContent value="checklist">
          <ChecklistTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

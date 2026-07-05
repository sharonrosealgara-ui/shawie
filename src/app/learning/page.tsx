"use client";

import { useState } from "react";
import { Plus, Trash2, Award, FolderKanban } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLearningStore } from "@/store/learning-store";

export default function LearningPage() {
  const tracks = useLearningStore((s) => s.tracks);
  const addTrack = useLearningStore((s) => s.addTrack);
  const updateTrack = useLearningStore((s) => s.updateTrack);
  const removeTrack = useLearningStore((s) => s.removeTrack);
  const [newTrack, setNewTrack] = useState("");

  return (
    <div>
      <PageHeader
        title="Learning"
        description="Track your progress across every skill you're building."
        actions={
          <div className="flex gap-2">
            <Input placeholder="New track name" value={newTrack} onChange={(e) => setNewTrack(e.target.value)} className="w-44" />
            <Button
              onClick={() => {
                if (!newTrack.trim()) return;
                addTrack({ name: newTrack, progress: 0, certificates: [], projects: [] });
                setNewTrack("");
                toast.success("Track added");
              }}
            >
              <Plus /> Add Track
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tracks.map((track) => (
          <Card key={track.id} className="gap-3">
            <div className="flex items-start justify-between">
              <p className="font-semibold">{track.name}</p>
              <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeTrack(track.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{track.progress}%</span>
              </div>
              <Progress value={track.progress} />
              <input
                type="range"
                min={0}
                max={100}
                value={track.progress}
                onChange={(e) => updateTrack(track.id, { progress: Number(e.target.value) })}
                className="mt-2 w-full accent-primary"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {track.certificates.length > 0 && (
                <Badge variant="outline" className="gap-1">
                  <Award className="size-3" /> {track.certificates.length} certs
                </Badge>
              )}
              {track.projects.length > 0 && (
                <Badge variant="outline" className="gap-1">
                  <FolderKanban className="size-3" /> {track.projects.length} projects
                </Badge>
              )}
            </div>

            <Textarea
              placeholder="Notes..."
              rows={2}
              defaultValue={track.notes ?? ""}
              onBlur={(e) => updateTrack(track.id, { notes: e.target.value })}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

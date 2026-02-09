import { GuidanceCard } from "@/components/GuidanceCard";
import { Code2, Wrench } from "lucide-react";

interface Project {
    name: string;
    whatItTeaches: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface ProjectSuggestionsCardProps {
  data: {
    projects : Project[];
  }
}

export const ProjectSuggestionsCard = ({ data }: ProjectSuggestionsCardProps) => {
  const difficultyColors = {
    Beginner: "bg-success/10 text-success border-success/20",
    Intermediate: "bg-accent/10 text-accent border-accent/20",
    Advanced: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <GuidanceCard
      title="Projects You Should Build"
      icon={Code2}
      accentColor="accent"
      defaultOpen
    >
      <div className="space-y-3">
        {data.projects.map((project, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-muted/30 border border-border/50 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-sm font-medium text-foreground">{project.name}</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${difficultyColors[project.difficulty]}`}
              >
                {project.difficulty}
              </span>
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {project.whatItTeaches}
            </p>
          </div>
        ))}
      </div>
    </GuidanceCard>
  );
};

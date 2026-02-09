import { GuidanceCard } from "@/components/GuidanceCard";
import { BookOpen, Clock, Target, Zap } from "lucide-react";

interface SkillLearningData {
  skill :{
    name: string;
    whyItMatters: string;
    prerequisites: string[];
    timeToLearn: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  };
}

interface SkillLearningCardProps {
  data: SkillLearningData;
}

export const SkillLearningCard = ({ data }: SkillLearningCardProps) => {
  const difficultyColors = {
    Beginner: "bg-success/10 text-success",
    Intermediate: "bg-accent/10 text-accent",
    Advanced: "bg-destructive/10 text-destructive",
  };

  return (
    <GuidanceCard
      title="How to Learn This Skill"
      icon={BookOpen}
      accentColor="primary"
      defaultOpen
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">{data.skill.name}</p>
            <p className="text-sm text-muted-foreground">{data.skill.whyItMatters}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Target className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Prerequisites</p>
            <ul className="space-y-1">
              {data.skill.prerequisites.map((prereq, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{data.skill.timeToLearn}</span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[data.skill.difficulty]}`}>
            {data.skill.difficulty}
          </span>
        </div>
      </div>
    </GuidanceCard>
  );
};

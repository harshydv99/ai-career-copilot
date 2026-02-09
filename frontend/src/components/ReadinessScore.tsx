import { TrendingUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadinessScoreProps {
  score: number;
  className?: string;
}

export const ReadinessScore = ({ score, className }: ReadinessScoreProps) => {
  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    return "text-accent";
  };

  const getProgressColor = () => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    return "bg-accent";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good Progress";
    return "Room to Grow";
  };

  return (
    <div className={cn("glass-card rounded-2xl p-6 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <h3 className="font-semibold text-foreground">Career Readiness Score</h3>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <span className={cn("text-5xl font-bold", getScoreColor())}>
            {score}
          </span>
          <span className="text-muted-foreground text-sm mb-2">/ 100</span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-1000 ease-out", getProgressColor())}
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className={cn("text-sm font-medium", getScoreColor())}>
            {getScoreLabel()}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>Based on your current profile and role expectations for entry-level positions.</p>
        </div>
      </div>
    </div>
  );
};

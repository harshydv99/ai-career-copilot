import { GuidanceCard } from "@/components/GuidanceCard";
import { TrendingUp, Briefcase, DollarSign, Rocket } from "lucide-react";

interface CareerImpactData {
  careerImpact: {
    jobRolesUnlocked: string[];
    salaryRange?: string;
    careerGrowthImpact: string;
};
}

interface CareerImpactCardProps {
  data: CareerImpactData;
}

export const CareerImpactCard = ({ data }: CareerImpactCardProps) => {
  return (
    <GuidanceCard
      title="What Happens When You Master This Skill?"
      icon={TrendingUp}
      accentColor="success"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Briefcase className="w-4 h-4 text-primary" />
            Job Roles Unlocked
          </div>
          <div className="flex flex-wrap gap-2 pl-6">
            {data.careerImpact.jobRolesUnlocked.map((role, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {data.careerImpact.salaryRange && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
            <DollarSign className="w-5 h-5 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Expected Salary Range</p>
              <p className="text-sm font-semibold text-success">{data.careerImpact.salaryRange}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 pt-2 border-t border-border/50">
          <Rocket className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground mb-1">Career Growth Impact</p>
            <p className="text-sm text-foreground">{data.careerImpact.careerGrowthImpact}</p>
          </div>
        </div>
      </div>
    </GuidanceCard>
  );
};

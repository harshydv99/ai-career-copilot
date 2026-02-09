import { GuidanceCard } from "@/components/GuidanceCard";
import { Award, BadgeCheck } from "lucide-react";

interface Certification {
  name: string;
  link: string;
  organization: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface CertificationsCardProps {
  data: {
    certifications: Certification[];
  };
}

export const CertificationsCard = ({ data }: CertificationsCardProps) => {
  const levelColors = {
    Beginner: "bg-success/10 text-success",
    Intermediate: "bg-primary/10 text-primary",
    Advanced: "bg-destructive/10 text-destructive",
    // Expert: "bg-destructive/10 text-destructive",
  };

  return (
    <GuidanceCard
      title="Certifications That Prove This Skill"
      icon={Award}
      accentColor="primary"
      // defaultOpen
    >
      <div className="space-y-3">
        {data.certifications.map((cert, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
          >
            <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">
                  {cert.name}
                </a>
              </p>
              <p className="text-xs text-muted-foreground">{cert.organization}</p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${levelColors[cert.level]}`}
            >
              {cert.level}
            </span>
          </div>
        ))}
      </div>
    </GuidanceCard>
  );
};

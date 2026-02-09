import { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuidanceCardProps {
  title: string;
  icon: LucideIcon;
  accentColor: "primary" | "accent" | "success" | "destructive";
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary",
    iconBg: "bg-primary/15",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    text: "text-accent",
    iconBg: "bg-accent/15",
  },
  success: {
    bg: "bg-success/10",
    border: "border-success/20",
    text: "text-success",
    iconBg: "bg-success/15",
  },
  destructive: {
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    text: "text-destructive",
    iconBg: "bg-destructive/15",
  },
};

export const GuidanceCard = ({
  title,
  icon: Icon,
  accentColor,
  children,
  defaultOpen = false,
}: GuidanceCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const colors = colorClasses[accentColor];

  return (
    <div
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300",
        colors.border
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left transition-colors",
          "hover:bg-muted/30"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", colors.iconBg)}>
            <Icon className={cn("w-4 h-4", colors.text)} />
          </div>
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 pt-0 space-y-3">{children}</div>
      </div>
    </div>
  );
};

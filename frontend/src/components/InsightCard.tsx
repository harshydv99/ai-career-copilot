import { LucideIcon, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export type InsightType = "strength" | "improvement" | "tip";

interface InsightCardProps {
  type: InsightType;
  title: string;
  items: string[];
  icon: LucideIcon;
  className?: string;
}

export const InsightCard = ({ type, title, items, icon: Icon, className }: InsightCardProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case "strength":
        return {
          bg: "bg-success/10",
          iconColor: "text-success",
          itemIcon: CheckCircle2,
          itemColor: "text-success",
        };
      case "improvement":
        return {
          bg: "bg-accent/10",
          iconColor: "text-accent",
          itemIcon: AlertCircle,
          itemColor: "text-accent",
        };
      case "tip":
        return {
          bg: "bg-primary/10",
          iconColor: "text-primary",
          itemIcon: Lightbulb,
          itemColor: "text-primary",
        };
    }
  };

  const styles = getTypeStyles();
  const ItemIcon = styles.itemIcon;

  return (
    <div className={cn("glass-card rounded-2xl p-6 space-y-4", className)}>
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", styles.bg)}>
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <ItemIcon className={cn("w-4 h-4 mt-1 shrink-0", styles.itemColor)} />
            <span className="text-sm text-foreground/90 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

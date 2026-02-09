import { LucideIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ActionItem {
  text: string;
  priority: "High" | "Medium" | "Low";
}

interface ActionCardProps {
  title: string;
  icon: LucideIcon;
  items: ActionItem[];
  accentColor: "primary" | "accent" | "success";
  className?: string;
}

export const ActionCard = ({ title, icon: Icon, items, accentColor, className }: ActionCardProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const getAccentStyles = () => {
    switch (accentColor) {
      case "primary":
        return { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" };
      case "accent":
        return { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" };
      case "success":
        return { bg: "bg-success/10", text: "text-success", border: "border-success/20" };
    }
  };

  const getPriorityStyles = (priority: ActionItem["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive";
      case "Medium":
        return "bg-accent/10 text-accent";
      case "Low":
        return "bg-muted text-success";
    }
  };

  const styles = getAccentStyles();

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn("glass-card rounded-2xl p-6 space-y-4", className)}>
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", styles.bg)}>
          <Icon className={cn("w-5 h-5", styles.text)} />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => toggleCheck(index)}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200",
              checkedItems.has(index)
                ? "bg-success/5 border-success/30"
                : "bg-muted/30 border-border hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
              checkedItems.has(index)
                ? "bg-success border-success"
                : "border-muted-foreground/30"
            )}>
              {checkedItems.has(index) && (
                <CheckCircle2 className="w-3 h-3 text-success-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm leading-relaxed transition-all",
                checkedItems.has(index) ? "text-muted-foreground line-through" : "text-foreground"
              )}>
                {item.text}
              </p>
            </div>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
              getPriorityStyles(item.priority)
            )}>
              {item.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
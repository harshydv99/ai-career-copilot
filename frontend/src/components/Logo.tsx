import { Sparkles } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg glow-effect">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
      <span className="text-xl font-bold text-foreground">
        GenAI <span className="gradient-text">Career Copilot</span>
      </span>
    </div>
  );
};

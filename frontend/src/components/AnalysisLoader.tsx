import { Sparkles, Brain, Target, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  { icon: Brain, text: "Reading your resume...", duration: 1000 },
  { icon: Target, text: "Identifying key skills...", duration: 1000 },
  { icon: Sparkles, text: "Generating recommendations...", duration: 1000 },
  { icon: CheckCircle, text: "Preparing your results...", duration: 500 },
];

export const AnalysisLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="text-center space-y-8 animate-fade-in max-w-md mx-auto px-6">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center mx-auto shadow-xl glow-effect animate-pulse-soft">
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 rounded-3xl gradient-bg opacity-20 blur-2xl scale-150" />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 justify-center transition-all duration-500",
                  isActive && "scale-105",
                  !isActive && !isComplete && "opacity-30"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  isComplete && "bg-success/10",
                  isActive && "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "w-4 h-4 transition-colors",
                    isComplete && "text-success",
                    isActive && "text-primary",
                    !isActive && !isComplete && "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isActive && "text-foreground",
                  isComplete && "text-muted-foreground",
                  !isActive && !isComplete && "text-muted-foreground"
                )}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

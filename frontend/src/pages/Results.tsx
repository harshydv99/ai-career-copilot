import { Logo } from "@/components/Logo";
import { ReadinessScore } from "@/components/ReadinessScore";
import { InsightCard } from "@/components/InsightCard";
import { ActionCard } from "@/components/ActionCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AskDoubtsSection } from "@/components/AskDoubtsSection";
import { PlacementOpportunities } from "@/components/PlacementOpportunities";
import { Button } from "@/components/ui/button";
import { exportAnalysisToPdf } from "@/lib/exportPdf";
import {
  FileText,
  Sparkles,
  Target,
  Rocket,
  Code,
  MessageSquare,
  ArrowLeft,
  Download,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const data = JSON.parse(localStorage.getItem("analysis") || "{}")
const placements = JSON.parse(localStorage.getItem("placements") || "[]");

console.log("Placements in Results page:", placements.placements);

// Mock analysis data
// const analysisData = {
//   score: 72,
//   strengths: [
//     "Strong technical foundation with Python and JavaScript",
//     "Relevant coursework in Machine Learning and Data Structures",
//     "Good project experience with web development",
//   ],
//   improvements: [
//     "Add more quantifiable achievements and metrics to projects",
//     "Include experience with cloud platforms (AWS, GCP, or Azure)",
//     "Expand on leadership or collaboration experiences",
//   ],
//   projects: [
//     { text: "Build a full-stack CRUD application with authentication", priority: "high" as const },
//     { text: "Create a data visualization dashboard using real APIs", priority: "high" as const },
//     { text: "Contribute to an open-source project on GitHub", priority: "medium" as const },
//     { text: "Deploy a project using Docker and cloud services", priority: "medium" as const },
//   ],
//   skills: [
//     { text: "Learn TypeScript for better code quality", priority: "high" as const },
//     { text: "Practice SQL and database design patterns", priority: "high" as const },
//     { text: "Get comfortable with Git branching strategies", priority: "medium" as const },
//     { text: "Explore CI/CD pipelines with GitHub Actions", priority: "low" as const },
//   ],
//   interview: [
//     { text: "Practice explaining your projects in 2-minute pitches", priority: "high" as const },
//     { text: "Review common system design interview patterns", priority: "high" as const },
//     { text: "Complete 50 LeetCode medium problems", priority: "medium" as const },
//     { text: "Prepare STAR method stories for behavioral questions", priority: "medium" as const },
//   ],
// };

const Results = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    exportAnalysisToPdf(data);
    setIsExporting(false);
  };


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
          style={{ background: "var(--gradient-glow)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-success/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => { navigate("/");
              // localStorage.removeItem("analysis");
              // localStorage.removeItem("placements"); 
              console.clear();
              }}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">New Analysis</span>
            </Button>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isExporting ? "Exporting..." : "Export PDF"}
              </span>
            </Button> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Title */}
          <div className="space-y-2 animate-slide-up">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Your Career Analysis
            </h1>
            <p className="text-muted-foreground">
              Here's what we found and your personalized action plan.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Resume Insights */}
            <div className="lg:col-span-2 space-y-6">
              {/* Resume Analysis Section */}
              <section className="space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Resume Insights</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <InsightCard
                    type="strength"
                    title="Strengths"
                    icon={Sparkles}
                    items={data.strengths}
                  // items={analysisData.strengths}
                  />
                  <InsightCard
                    type="improvement"
                    title="Areas to Improve"
                    icon={Target}
                    items={data.improvements}
                  // items={analysisData.improvements}
                  />
                </div>
              </section>

              {/* Actions Section */}
              <section className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Your Next Best Actions</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ActionCard
                    title="Projects to Build"
                    icon={Code}
                    // items={analysisData.projects}
                    items={data.projects}
                    accentColor="primary"
                  />
                  <ActionCard
                    title="Skills to Strengthen"
                    icon={Target}
                    // items={analysisData.skills}
                    items={data.skills}
                    accentColor="accent"
                  />
                  <ActionCard
                    title="Interview Prep"
                    icon={MessageSquare}
                    // items={analysisData.interview}
                    items={data.interview}
                    accentColor="success"
                    className="sm:col-span-2 lg:col-span-1"
                  />
                </div>
              </section>
            </div>

            {/* Right Column - Score */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
              <ReadinessScore score={data.score} />

              {/* Quick Tips Card */}
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Quick Tips
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Focus on high-priority items first for maximum impact
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Check off items as you complete them to track progress
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Revisit your resume analysis monthly
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ask Your Doubts Section */}
          <AskDoubtsSection />

          {/* Placement Opportunities Section */}
          <PlacementOpportunities data={{ placements: placements.placements }} />
          {/* <PlacementOpportunities /> */}
        </div>
      </main>
    </div>
  );
};

export default Results;

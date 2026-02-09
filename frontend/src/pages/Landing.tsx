import { Logo } from "@/components/Logo";
import { ResumeUpload } from "@/components/ResumeUpload";
import { AnalysisLoader } from "@/components/AnalysisLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleUpload = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      navigate("/results");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30"
          style={{ background: "var(--gradient-glow)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Hero Text */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Your AI-powered guide to{" "}
              <span className="gradient-text">career readiness</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your resume and get personalized feedback, project recommendations, 
              and a clear action plan to land your dream role.
            </p>
          </div>

          {/* Upload Section */}
          <div className="pt-4">
            <ResumeUpload onUpload={handleUpload} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isAnalyzing && <AnalysisLoader />}
    </div>
  );
};

export default Landing;

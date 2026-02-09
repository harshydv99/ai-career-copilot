import { useState, useEffect, useCallback } from "react";
import { Upload, FileText, Shield, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { analyzeResume, fetchPlacements } from "@/lib/api";
import { validateAndNormalizeAnalysis } from "@/lib/validateAnalysis"
import { toast, Toaster } from "sonner";
import { Toast } from "@radix-ui/react-toast";

interface ResumeUploadProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const ResumeUpload = ({ onUpload, isAnalyzing }: ResumeUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [placements, setPlacements] = useState<any[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      return toast.error("Please upload a PDF resume first.");
      // return alert("Please upload a PDF resume first.");
    }

    try {
      const result = await analyzeResume(uploadedFile);
      const normalizedAnalysis = validateAndNormalizeAnalysis(result.analysis);
      
      if (!normalizedAnalysis) {
        toast.error("This doesn’t look like a valid resume. Please upload a proper resume.");
        // alert("This doesn’t look like a valid resume. Please upload a proper resume.");
        return;
      }
      onUpload(uploadedFile);

      const placementResult = await fetchPlacements(normalizedAnalysis);

      localStorage.setItem("analysis", JSON.stringify(normalizedAnalysis));
      localStorage.setItem("placements", JSON.stringify(placementResult.placements || []));

    } catch (error) {
      console.error("Resume analysis failed:", error);
      toast.error("Something went wrong. Please try again.");
      // alert("Something went wrong. Please try again.");
    }
  };

  //   useEffect(() => {
  //   const fetchPlacements = async () => {
  //     const analysis = JSON.parse(
  //       localStorage.getItem("analysis") || "{}"
  //     );

  //     if (!analysis || Object.keys(analysis).length === 0) return;

  //     const res = await fetch("http://localhost:8000/placements", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ analysis }),
  //     });

  //     const data = await res.json();
  //     setPlacements(data.placements.placements || []);
  //   };

  //   fetchPlacements();

  // }, []);

  return (
    <>
      <Toaster richColors position="bottom-right" closeButton />
    <div className="w-full max-w-xl mx-auto space-y-6 animate-slide-up">
      {/* Upload Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8 md:p-12",
          "bg-card/50 backdrop-blur-sm",
          isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-card/80",
          uploadedFile && "border-success bg-success/5"
        )}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isAnalyzing}
        />

        <div className="flex flex-col items-center text-center space-y-4">
          {uploadedFile ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {(uploadedFile.size / 1024).toFixed(1)} KB • Ready to analyze
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                isDragging ? "bg-primary/20" : "bg-muted"
              )}>
                <Upload className={cn(
                  "w-8 h-8 transition-colors",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Drop your resume here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse • PDF format
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <Button
        variant="hero"
        size="xl"
        className="w-full"
        onClick={handleAnalyze}
        disabled={!uploadedFile || isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            Analyze My Resume
          </>
        )}
      </Button>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-success" />
          <span>No login required</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span>Your data stays private</span>
        </div>
      </div>
    </div>
    </>
  );
};

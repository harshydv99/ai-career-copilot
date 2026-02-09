import { useState } from "react";
import { askDoubt } from "@/lib/api";
import { MessageCircleQuestion, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceInput } from "@/components/VoiceInput";
import { Toaster, toast } from 'sonner'
import { LanguageSelector, Language } from "@/components/LanguageSelector";
import { SkillLearningCard } from "@/components/guidance/SkillLearningCard";
import { ProjectSuggestionsCard } from "@/components/guidance/ProjectSuggestionsCard";
import { LearningResourcesCard } from "@/components/guidance/LearningResourcesCard";
import { CertificationsCard } from "@/components/guidance/CertificationsCard";
import { CareerImpactCard } from "@/components/guidance/CareerImpactCard";

// Translations for UI elements
const translations = {
  en: {
    sectionTitle: "Ask Your Doubts",
    sectionSubtitle: "Get personalized AI guidance on skills, projects, learning paths, and career decisions.",
    placeholder: "Ask anything about skills, projects, learning paths, certifications, or careers…",
    button: "Get Guidance",
    processing: "Thinking...",
  },
  hi: {
    sectionTitle: "अपने सवाल पूछें",
    sectionSubtitle: "कौशल, प्रोजेक्ट्स, सीखने के मार्ग और करियर निर्णयों पर व्यक्तिगत AI मार्गदर्शन प्राप्त करें।",
    placeholder: "कौशल, प्रोजेक्ट्स, सीखने के मार्ग, प्रमाणपत्र, या करियर के बारे में कुछ भी पूछें…",
    button: "मार्गदर्शन प्राप्त करें",
    processing: "सोच रहा हूं...",
  },
  es: {
    sectionTitle: "Pregunta tus dudas",
    sectionSubtitle: "Obtén orientación personalizada de IA sobre habilidades, proyectos, rutas de aprendizaje y decisiones profesionales.",
    placeholder: "Pregunta sobre habilidades, proyectos, rutas de aprendizaje, certificaciones o carreras…",
    button: "Obtener orientación",
    processing: "Pensando...",
  },
  fr: {
    sectionTitle: "Posez vos questions",
    sectionSubtitle: "Obtenez des conseils personnalisés par IA sur les compétences, projets, parcours d'apprentissage et décisions de carrière.",
    placeholder: "Demandez sur les compétences, projets, parcours d'apprentissage, certifications ou carrières…",
    button: "Obtenir des conseils",
    processing: "Réflexion...",
  },
};

// Mock response data
// const mockResponse = {
//   skillLearning: {
//     skillName: "TypeScript",
//     whyItMatters: "TypeScript adds static typing to JavaScript, making your code more robust, maintainable, and easier to refactor in large codebases.",
//     prerequisites: ["JavaScript fundamentals", "ES6+ syntax", "Basic understanding of types"],
//     timeToLearn: "2-4 weeks for basics, 2-3 months for proficiency",
//     difficulty: "Intermediate" as const,
//   },
//   projects: [
//     {
//       name: "Full-Stack Task Manager",
//       whatItTeaches: "Learn TypeScript with React, Node.js, and database integration",
//       difficulty: "Intermediate" as const,
//     },
//     {
//       name: "Real-time Chat Application",
//       whatItTeaches: "WebSockets, type-safe APIs, and state management",
//       difficulty: "Advanced" as const,
//     },
//     {
//       name: "Personal Portfolio with Blog",
//       whatItTeaches: "Static site generation, Markdown parsing, and deployment",
//       difficulty: "Beginner" as const,
//     },
//   ],
//   resources: {
//     courses: [
//       { platform: "Udemy - Understanding TypeScript", type: "Paid" as const },
//       { platform: "Codecademy - Learn TypeScript", type: "Free" as const },
//     ],
//     documentation: [
//       { platform: "TypeScript Official Docs", type: "Free" as const },
//       { platform: "TypeScript Deep Dive", type: "Free" as const },
//     ],
//     videosBlogs: [
//       { platform: "Fireship - TypeScript in 100 Seconds", type: "Free" as const },
//       { platform: "Matt Pocock - Total TypeScript", type: "Paid" as const },
//     ],
//   },
//   certifications: [
//     { name: "Microsoft Certified: Azure Developer", organization: "Microsoft", level: "Intermediate" as const },
//     { name: "TypeScript Developer Certificate", organization: "W3Schools", level: "Beginner" as const },
//   ],
//   careerImpact: {
//     jobRolesUnlocked: ["Frontend Developer", "Full-Stack Engineer", "React Developer", "Node.js Developer"],
//     salaryRange: "$80,000 - $150,000/year",
//     careerGrowthImpact: "TypeScript is now required for most senior frontend and full-stack positions. Mastering it opens doors to top tech companies and significantly increases your market value.",
//   },
// };

interface Response {
  id: string;
  question: string;
  // data: typeof mockResponse;
}

export const AskDoubtsSection = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [latestDoubtResult, setLatestDoubtResult] = useState<any>(null);

  const t = translations[language];

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!question.trim() || isLoading) return;

  //   setIsLoading(true);
    
  //   // Simulate AI processing
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
    
  //   const newResponse: Response = {
  //     id: Date.now().toString(),
  //     question: question.trim(),
  //     data: mockResponse,
  //   };
    
  //   setResponses((prev) => [newResponse, ...prev]);
  //   setQuestion("");
  //   setIsLoading(false);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!question.trim() || isLoading) return;

  setIsLoading(true);

  try {
    // 1️⃣ Get resume analysis (context)
    const analysis = JSON.parse(
      localStorage.getItem("analysis") || "null"
    );

    // 2️⃣ Call backend
    const result = await askDoubt({
      question: question.trim(),
      language: language || "en",
      analysis,
    });

    // 3️⃣ Construct response object for UI
    const newResponse: Response = {
      id: Date.now().toString(),
      question: question.trim(),
      data: result.data, // 🔥 REAL BACKEND DATA
    };

    setLatestDoubtResult(result.data);

    // 4️⃣ Update UI
    setResponses((prev) => [newResponse, ...prev]);
    setQuestion("");

  } catch (error) {
    console.error("Ask Doubt failed:", error);
    toast.error("Unable to fetch guidance. Please try again.");
    // alert("Unable to fetch guidance. Please try again.");
  } finally {
    setIsLoading(false);
  }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setQuestion(transcript);
  };

  return (
    <section className="space-y-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <Toaster richColors position="bottom-right" closeButton />
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <MessageCircleQuestion className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t.sectionTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.sectionSubtitle}</p>
          </div>
        </div>
        {/* <LanguageSelector value={language} onChange={setLanguage} /> */}
      </div>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.placeholder}
              className="w-full h-12 px-4 pr-12 rounded-xl bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <VoiceInput onTranscript={handleVoiceTranscript} disabled={isLoading} />
            </div>
          </div>
          <Button
            type="submit"
            className="h-12 px-6 rounded-xl gradient-bg"
            disabled={!question.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline ml-2">{t.processing}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">{t.button}</span>
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Responses */}
      {responses.length > 0 && (
        <div className="space-y-6">
          {responses.map((response) => (
            <div key={response.id} className="space-y-4 animate-fade-in">
              {/* Question Display */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <MessageCircleQuestion className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-foreground">{response.question}</p>
              </div>

              {/* Response Cards Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <SkillLearningCard data={latestDoubtResult} />
                <ProjectSuggestionsCard data={latestDoubtResult} />
                <LearningResourcesCard data={latestDoubtResult} />
                <CertificationsCard data={latestDoubtResult} />
                <div className="md:col-span-2">
                  <CareerImpactCard data={latestDoubtResult} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

type Priority = "High" | "Medium" | "Low";

interface Item {
  text: string;
  priority: Priority;
}

export interface AnalysisSchema {
  score: number;
  strengths: string[];
  improvements: string[];
  projects: Item[];
  skills: Item[];
  interview: Item[];
}

const normalizePriority = (value: any): Priority => {
  if (value === "High" || value === "Medium" || value === "Low") {
    return value;
  }
  return "Medium";
};

const normalizeItemArray = (arr: any[]): Item[] => {
  if (!Array.isArray(arr)) return [];

  return arr
    .filter(item => typeof item?.text === "string")
    .map(item => ({
      text: item.text,
      priority: normalizePriority(item.priority),
    }));
};

export function validateAndNormalizeAnalysis(
  analysis: any
): AnalysisSchema | null {
  // ❌ completely missing or empty object
  if (!analysis || typeof analysis !== "object") return null;
  if (Object.keys(analysis).length === 0) return null;

  // ❌ minimal required fields
  if (
    typeof analysis.score !== "number" ||
    !Array.isArray(analysis.strengths) ||
    !Array.isArray(analysis.improvements)
  ) {
    return null;
  }

  // ✅ return STRICT, FRONTEND-SAFE SHAPE
  return {
    score: Math.max(0, Math.min(100, Math.round(analysis.score))),

    strengths: analysis.strengths.filter(
      (s: any) => typeof s === "string"
    ),

    improvements: analysis.improvements.filter(
      (s: any) => typeof s === "string"
    ),

    projects: normalizeItemArray(analysis.projects || []),

    skills: normalizeItemArray(analysis.skills || []),

    interview: normalizeItemArray(analysis.interview || []),
  };
}
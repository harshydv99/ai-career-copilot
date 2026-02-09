const API = import.meta.env.VITE_API_URL;

export async function analyzeResume(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(
    `${API}/analyze-resume`,
    {
      method: "POST",
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error("Resume analysis failed")
  }

  return response.json()
}

export async function askDoubt({
  question,
  language = "en",
  analysis,
}: {
  question: string;
  language?: string;
  analysis?: any;
}) {
  const res = await fetch(`${API}/ask-doubt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      language,
      analysis,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to get guidance");
  }

  return res.json(); // { status, data }
}

export async function fetchPlacements(analysis: any) {
  const res = await fetch(`${API}/placements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ analysis }),
  });

  if (!res.ok) throw new Error("Failed to fetch placements");

  return res.json();
}
export async function analyzeResume(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(
    "http://localhost:8000/analyze-resume",
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
  const res = await fetch("http://localhost:8000/ask-doubt", {
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
  const res = await fetch("http://localhost:8000/placements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ analysis }),
  });

  if (!res.ok) throw new Error("Failed to fetch placements");

  return res.json();
}
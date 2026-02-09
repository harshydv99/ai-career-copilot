from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from resume_parser import extract_text_from_pdf
from agent import career_agent, ask_doubt_agent, placement_lead_agent
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-career-copilot-harshydv99.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskDoubtRequest(BaseModel):
    question: str
    language: Optional[str] = "en"   # for future multilingual support
    analysis: Optional[Dict[str, Any]] = None

class AskDoubtResponse(BaseModel):
    status: str
    data: Dict[str, Any]

class PlacementRequest(BaseModel):
    analysis: Dict[str, Any]

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    resume_text = extract_text_from_pdf(file.file)
    analysis = career_agent(resume_text)

    return {
        "status": "success",
        "analysis": analysis
    }

@app.post("/ask-doubt", response_model=AskDoubtResponse)
def ask_doubt(req: AskDoubtRequest):
    """
    Handles post-resume 'Ask Your Doubts' queries.
    """

    data = ask_doubt_agent(
        question=req.question,
        analysis=req.analysis
    )

    return {
        "status": "success",
        "data": data
    }

@app.post("/placements")
def placements(req: PlacementRequest):
    data = placement_lead_agent(req.analysis)

    return {
        "status": "success",
        "placements": data
    }

import os
import json
from openai import OpenAI
from typing import Optional, Dict, Any

from prompts import (
    ASK_DOUBT_PROMPT,
    PLACEMENT_LEAD_PROMPT,
    STRUCTURED_ANALYSIS_PROMPT
)
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"))
# print("API KEY:", os.getenv("OPENROUTER_API_KEY"))

def call_llm(prompt):
    response = client.chat.completions.create(model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}],
    # max_tokens=1000,
    temperature=0.4)
    return response.choices[0].message.content


def career_agent(resume_text):
    analysis_prompt = STRUCTURED_ANALYSIS_PROMPT.format(
        resume_text=resume_text[:3000]
    )
    analysis = call_llm(analysis_prompt)

    parsed_json = json.loads(analysis)
    return parsed_json

def ask_doubt_agent(
    question: str,
    analysis: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Generates structured career guidance for the 'Ask Your Doubts' section.
    """

    prompt = ASK_DOUBT_PROMPT.format(
        question=question,
        analysis=json.dumps(analysis, ensure_ascii=False)
        if analysis else "No resume context provided"
    )

    raw_output = call_llm(prompt)

    parsed = json.loads(raw_output)
    return parsed

def placement_lead_agent(analysis: dict):
    prompt = PLACEMENT_LEAD_PROMPT.format(
        analysis=json.dumps(analysis, ensure_ascii=False)
    )

    raw_output = call_llm(prompt)

    parsed = json.loads(raw_output)
    return parsed